import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import { joiResolver} from '@hookform/resolvers/joi';
import joi from 'joi';
import axios from 'axios';

type RegistroIngreso = {
  name: string;
  email: string;
};

const EsquemaRegistro = joi.object<RegistroIngreso>({
  name: joi.string().min(4).max(20).required().messages({
    'string.empty': 'El nombre es obligatorio',
    'string.min': 'El nombre debe tener al menos 4 caracteres',
    'string.max': 'El nombre no puede exceder los 20 caracteres',
  }),
    email: joi.string().email({tlds:{allow:false}}).required().messages({
    'string.empty': 'El email es obligatorio',
    'string.email': 'El email debe ser válido',
  }),
});

export const FormularioRegistro = () => {
  const navigate = useNavigate();
  const {register, handleSubmit, formState: {errors}} = useForm<RegistroIngreso>({
    resolver: joiResolver(EsquemaRegistro),
  });

  const onSubmit = async (data: RegistroIngreso) => {
    try {
      
      const res = await axios.post('http://localhost:2565/users', data);
      localStorage.setItem('usuarioID', res.data._id);
      localStorage.setItem('usuarioNombre', data.name);
      localStorage.setItem('usuarioEmail', data.email);
      console.log('Se ha registrado el usuario:', res.data);
      navigate('/ListaDePosts');
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  };

  return (
    <div>
      <h1>Pagina de Registro</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input id="name" {...register('name')} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
