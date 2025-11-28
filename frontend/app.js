const API_URL = 'http://localhost:3000';


const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const registerForm = document.getElementById('register-form');
const registerMessage = document.getElementById('register-message');
const logoutBtn = document.getElementById('logout-btn');
const userGreeting = document.getElementById('user-greeting');

const cursosList = document.getElementById('cursos-list');
const refreshCursosBtn = document.getElementById('refresh-cursos-btn');
const misCursosCard = document.getElementById('mis-cursos-card');
const misCursosList = document.getElementById('mis-cursos-list');
const refreshMisCursosBtn = document.getElementById('refresh-mis-cursos-btn');
const createCursoCard = document.getElementById('create-curso-card');
const createCursoForm = document.getElementById('create-curso-form');
const createCursoMessage = document.getElementById('create-curso-message');
const createInscripcionCard = document.getElementById('create-inscripcion-card');
const createInscripcionForm = document.getElementById('create-inscripcion-form');
const createInscripcionMessage = document.getElementById('create-inscripcion-message');

// Campos condicionales del registro
const regRol = document.getElementById('reg-rol');
const estudianteFields = document.getElementById('estudiante-fields');
const profesorFields = document.getElementById('profesor-fields');

let token = localStorage.getItem('token');
let user = JSON.parse(localStorage.getItem('user') || '{}');

function init() {
    if (token) {
        showDashboard();
    } else {
        showLogin();
    }
}

function showLogin() {
    loginSection.classList.remove('hidden');
    dashboardSection.classList.add('hidden');
}

function showDashboard() {
    loginSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
    userGreeting.textContent = `Hola, ${user.email || 'Usuario'} (${user.rol || 'Invitado'})`;
    
    // Mostrar panel según el rol del usuario
    if (user.rol === 'profesor') {
        createCursoCard.classList.remove('hidden');
        createInscripcionCard.classList.add('hidden');
        misCursosCard.classList.add('hidden');
    } else if (user.rol === 'estudiante') {
        createCursoCard.classList.add('hidden');
        createInscripcionCard.classList.remove('hidden');
        misCursosCard.classList.remove('hidden');
        loadMisCursos();
    } else {
        createCursoCard.classList.add('hidden');
        createInscripcionCard.classList.add('hidden');
        misCursosCard.classList.add('hidden');
    }
    
    loadCursos();
}

regRol.addEventListener('change', () => {
    const rol = regRol.value;
    if (rol === 'estudiante') {
        estudianteFields.classList.remove('hidden');
        profesorFields.classList.add('hidden');
        document.getElementById('reg-ingreso').required = false;
        document.getElementById('reg-especialidad').required = false;
    } else if (rol === 'profesor') {
        estudianteFields.classList.add('hidden');
        profesorFields.classList.remove('hidden');
        document.getElementById('reg-ingreso').required = false;
        document.getElementById('reg-especialidad').required = true;
    } else {
        estudianteFields.classList.add('hidden');
        profesorFields.classList.add('hidden');
    }
});

// Registro
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    registerMessage.textContent = '';
    registerMessage.style.color = 'black';

    const nombre_completo = document.getElementById('reg-nombre').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const rol = document.getElementById('reg-rol').value;

    try {

        
        //Crear usuario
        const userResponse = await fetch(`${API_URL}/usuarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre_completo, email, password, rol })
        });

        if (!userResponse.ok) {
            const errorData = await userResponse.json();
            throw new Error(errorData.message || 'Error al crear usuario');
        }

        const usuario = await userResponse.json();



        //Crear perfil según el rol
        if (rol === 'estudiante') {
            const ingreso = document.getElementById('reg-ingreso').value || null;

            const estudianteResponse = await fetch(`${API_URL}/estudiantes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario_id: usuario.id, ingreso })
            });

            if (!estudianteResponse.ok) {
                const errorData = await estudianteResponse.json();
                throw new Error(errorData.message || 'Error al crear perfil de estudiante');
            }
        } else if (rol === 'profesor') {
            const especialidad = document.getElementById('reg-especialidad').value;

            const profesorResponse = await fetch(`${API_URL}/profesores`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario_id: usuario.id, especialidad })
            });

            if (!profesorResponse.ok) {
                const errorData = await profesorResponse.json();
                throw new Error(errorData.message || 'Error al crear perfil de profesor');
            }
        }

        registerMessage.textContent = '¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.';
        registerMessage.style.color = 'green';
        registerForm.reset();
        estudianteFields.classList.add('hidden');
        profesorFields.classList.add('hidden');
    } catch (error) {
        registerMessage.textContent = error.message;
        registerMessage.style.color = 'red';
    }
});

// Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) throw new Error('Credenciales inválidas');

        const data = await response.json();
        token = data.access_token;
        
       
        const statusResponse = await fetch(`${API_URL}/auth/check-status`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const statusData = await statusResponse.json();
        user = statusData.user;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        loginError.textContent = '';
        showDashboard();
    } catch (error) {
        loginError.textContent = error.message;
    }
});

// Logout
logoutBtn.addEventListener('click', () => {
    token = null;
    user = {};
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    showLogin();
});

// Cargar Cursos Disponibles (todos)
async function loadCursos() {
    try {
        const response = await fetch(`${API_URL}/cursos`);
        const cursos = await response.json();
        
        cursosList.innerHTML = '';
        
        // También actualizar el select de cursos para estudiantes (todos los cursos disponibles)
        const selectCurso = document.getElementById('inscripcion-curso-id');
        if (selectCurso && user.rol === 'estudiante') {
            selectCurso.innerHTML = '<option value="">-- Seleccione un curso --</option>';
            cursos.forEach(curso => {
                const option = document.createElement('option');
                option.value = curso.id;
                option.textContent = `${curso.nombre} (${curso.creditos} créditos)`;
                selectCurso.appendChild(option);
            });
        }
        
        if (cursos.length === 0) {
            cursosList.innerHTML = '<li style="color: #7f8c8d;">No hay cursos disponibles</li>';
            return;
        }
        
        cursos.forEach(curso => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${curso.nombre}</strong> (${curso.creditos} créditos) - ID: ${curso.id}<br>
                <small>${curso.descripcion}</small><br>
                <small>Profesor: ${curso.profesor?.usuario?.nombre_completo || 'Sin asignar'}</small>
            `;
            cursosList.appendChild(li);
        });
    } catch (error) {
        console.error('Error cargando cursos:', error);
        cursosList.innerHTML = '<li style="color: #e74c3c;">Error al cargar los cursos</li>';
    }
}

// Cargar Cursos Inscritos del Estudiante
async function loadMisCursos() {
    if (user.rol !== 'estudiante') return;
    
    try {
        const estudiantesResponse = await fetch(`${API_URL}/estudiantes`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const estudiantes = await estudiantesResponse.json();
        
        // Encontrar el estudiante actual por usuario_id
        const estudiante = estudiantes.find(e => e.usuario?.id === user.id);
        
        let cursos = [];
        if (estudiante) {
            const estudianteDetailResponse = await fetch(`${API_URL}/estudiantes/${estudiante.id}`);
            const estudianteDetail = await estudianteDetailResponse.json();
            cursos = estudianteDetail.inscripciones?.map(i => i.curso) || [];
        }
        
        misCursosList.innerHTML = '';
        
        if (cursos.length === 0) {
            misCursosList.innerHTML = '<li style="color: #7f8c8d;">No estás inscrito en ningún curso</li>';
            return;
        }
        
        cursos.forEach(curso => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${curso.nombre}</strong> (${curso.creditos} créditos)<br>
                <small>${curso.descripcion}</small><br>
            `;
            misCursosList.appendChild(li);
        });
    } catch (error) {
        console.error('Error cargando mis cursos:', error);
        misCursosList.innerHTML = '<li style="color: #e74c3c;">Error al cargar tus cursos</li>';
    }
}

refreshCursosBtn.addEventListener('click', loadCursos);
refreshMisCursosBtn.addEventListener('click', loadMisCursos);

// Crear Curso
createCursoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    createCursoMessage.textContent = '';
    createCursoMessage.style.color = 'black';

    const nombre = document.getElementById('curso-nombre').value;
    const descripcion = document.getElementById('curso-desc').value;
    const creditos = +document.getElementById('curso-creditos').value;

    try {
        const response = await fetch(`${API_URL}/cursos/crear`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ nombre, descripcion, creditos })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear curso');
        }

        createCursoMessage.textContent = 'Curso creado exitosamente!';
        createCursoMessage.style.color = 'green';
        createCursoForm.reset();
        loadCursos(); // Recargar lista
    } catch (error) {
        createCursoMessage.textContent = error.message;
        createCursoMessage.style.color = 'red';
    }
});

createInscripcionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    createInscripcionMessage.textContent = '';
    createInscripcionMessage.style.color = 'black';

    const curso_id = +document.getElementById('inscripcion-curso-id').value;
    const fecha_inscripcion = document.getElementById('inscripcion-fecha').value;

    try {
        const response = await fetch(`${API_URL}/inscripciones/inscribir`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ curso_id, fecha_inscripcion })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear inscripción');
        }

        createInscripcionMessage.textContent = 'Inscripción creada exitosamente!';
        createInscripcionMessage.style.color = 'green';
        createInscripcionForm.reset();
        loadMisCursos(); // Recargar cursos inscritos
    } catch (error) {
        createInscripcionMessage.textContent = error.message;
        createInscripcionMessage.style.color = 'red';
    }
});

// Iniciar
init();
