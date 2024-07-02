import Message from '../layout/Message';
import { useLocation } from 'react-router-dom';
import styles from './Projects.module.css';
import Container from '../layout/Container';
import LinkButton from '../layout/LinkButton';
import ProjectCard from '../project/ProjectCard';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';

function Projects() {
    const [projects, setProjects] = useState([]);
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [projectMessage, setProjectMessage] = useState(''); // Adicionado estado para `projectMessage`

    let message = '';

    if (location.state && location.state.message) {
        message = location.state.message;
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(resp => resp.json())
                .then(data => {
                    console.log(data);
                    setProjects(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });
        }, 300);
    }, []);

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(resp => resp.json())
            .then(data => {
                setProjects(projects.filter((project) => project.id !== id));
                setProjectMessage('Projeto removido com sucesso!'); // Atualizado `projectMessage`
            })
            .catch(err => console.log(err));
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container customClass="start">
                {loading && <Loading />} {/* Renderizando `Loading` enquanto `loading` é verdadeiro */}
                {!loading && projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category ? project.category.name : 'Unknown'}
                            key={project.id}
                            handleRemove={removeProject}
                        />
                    ))
                }
                {!loading && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    );
}

export default Projects;