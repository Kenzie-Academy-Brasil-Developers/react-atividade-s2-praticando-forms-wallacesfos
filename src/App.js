import './App.css';
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

function App() {

  const foraSchema = yup.object().shape({
    user: yup.string().required('Nome de usuário obrigatório'),
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('email obrigatório').email('email invalido'),
    confemail: yup.string().oneOf([yup.ref('email'), null], 'Emails devem ser iguais'),
    password: yup.string().required('Senha obrigatório').matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*)(?=.*[@$!%*?&])[A-Za-z@$!%*?&]{8,}$", 'Senha deve ser forte'),
    passwordConfirmation: yup.string()
     .oneOf([yup.ref('password'), null], 'Senhas devem ser iguais')
  })

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(foraSchema)
  })


  const onSubmitFunction = (data) => {
  
  }


  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <input placeholder={errors.user?.message || 'Nome de usuário'} className={errors.user && 'vermelho' } {...register('user')}/>
          <input placeholder={errors.name?.message || "Nome completo"} className={errors.name && 'vermelho' } {...register('name')}/>
          <input placeholder={errors.email?.message || "Email"} className={errors.email && 'vermelho' } {...register('email')}/>
          <input placeholder={errors.confemail?.message ||"Confirme o email"} className={errors.email && 'vermelho' } {...register('confemail')}/>
          <input type="password" placeholder={errors.password?.message ||"Senha"} className={errors.password && 'vermelho' } {...register('password')}/>
          <input type="password" placeholder={errors.passwordConfirmation?.message ||"Confirme senha"}  className={errors.passwordConfirmation && 'vermelho' } {...register('passwordConfirmation')}/>
          <button type="submit" className="cadastrar">Cadastrar</button>
        </form>
      </header>
    </div>
  );
}

export default App;
