import React from 'react';
import { useNavigate } from 'react-router-dom';

const GroupPage = () => {
  const navigate = useNavigate();

  const groupData = {
    nombre: 'Grupo de Ejemplo',
    descripcion: 'Este es un grupo de ejemplo para propósitos ilustrativos.',
    creador: 'Usuario Ejemplo',
    miembros: [
      { _id: '1', nombre: 'Usuario 1' },
      { _id: '2', nombre: 'Usuario 2' },
      { _id: '3', nombre: 'Usuario 3' },
    ],
  };

  // Función para redirigir al hacer clic en el botón Grupos
  const redirectToGroups = () => {
    navigate('/group'); // Redirige a la ruta '/group'
  };

  return (
    <div>
      <h1>{groupData.nombre}</h1>
      <p>{groupData.descripcion}</p>
      <p>Creador: {groupData.creador}</p>
      <p>Miembros:</p>
      <ul>
        {groupData.miembros.map((miembro) => (
          <li key={miembro._id}>{miembro.nombre}</li>
        ))}
      </ul>
      {/* Botón para redireccionar a la ruta '/group' */}
      <button onClick={redirectToGroups}>Ir a Grupos</button>
    </div>
  );
};

export default GroupPage;
