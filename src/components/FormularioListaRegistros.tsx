import { useEffect, useState } from 'react';
import axios from 'axios';

type Registro = {
    _id: string;
  name: string;
  email: string;
  isActive: boolean;
};

export const RecuperacionRegistros = () => {
    const [registros, setRegistros] = useState<Registro[]>([]);

    const fetchRegistros = async () => {
        try {
            const res = await axios.get('http://localhost:2565/users');
            console.log('Registros recuperados:', res.data);
            setRegistros(res.data.data);
        } catch (error) {
            console.error('Error al recuperar los registros', error);
        }
    };
    useEffect(() => {
        fetchRegistros();
    }, []);

    const ActivarDesactivarRegistro = async (registroId: string, isActive: boolean) => {
        try{
            if(isActive) {
                await axios.patch(`http://localhost:2565/users/${registroId}/desactivate`);
            } else {
                await axios.patch(`http://localhost:2565/users/${registroId}/activate`);
            }
            fetchRegistros();
        }catch (error) {
            console.error('Error al activar/desactivar el registro:', error);
        }
    };

    return (
        <div>
            <h1>Lista de Registros</h1>
            <ul>
                {registros.map((registro) => (
                    <li key={registro._id}>
                        <p>Nombre: {registro.name}</p>
                        <p>Email: {registro.email}</p>
                        <p>Activo: {registro.isActive ? 'Sí' : 'No'}</p>
                        <button onClick={() => ActivarDesactivarRegistro(registro._id,registro.isActive)}>{registro.isActive ? 'Desactivar' : 'Activar'}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}