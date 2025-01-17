import ProjectForm from '../project/ProjectForm';
import { useNavigate } from 'react-router-dom';
import styles from './NewProject.module.css';

function NewProject() {
    const navigate = useNavigate();

    function createPost(project) {
        // initialize cost and services
        project.cost = 0;
        project.services = [];

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project), // Corrigido: adicionando o corpo do pedido
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            // Redireciona após a criação
            navigate('/projects', { state: { message: 'Projeto criado com sucesso!' } });
        })
        .catch((err) => console.log(err));
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm btnText="Criar Projeto" handleSubmit={createPost} /> {/* Passando a função como prop */}
        </div>
    );
}

export default NewProject;