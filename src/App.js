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
    password: yup.string().required('Senha obrigatório').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
    , 'Senha deve ser forte'),
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
        <ul>
          {<li>{errors.user?.message}</li>}
          {<li>{errors.name?.message}</li>}
          {<li>{errors.email?.message}</li>}
          {<li>{errors.confemail?.message}</li>}
          {<li>{errors.password?.message}</li>}
          {<li>{errors.passwordConfirmation?.message}</li>}
        </ul>
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <input type="text"  maxlength="15" placeholder='Nome de usuário' className={errors.user && 'vermelho' } {...register('user')}/>
          <input type="text"  maxlength="80" placeholder="Nome completo" className={errors.name && 'vermelho' } {...register('name')}/>
          <input placeholder="Email" className={errors.email && 'vermelho' } {...register('email')}/>
          <input placeholder="Confirme o email" className={errors.email && 'vermelho' } {...register('confemail')}/>
          <input type="password" placeholder="Senha" maxlength="30" className={errors.password && 'vermelho' } {...register('password')}/>
          <input type="password" placeholder="Confirme senha" maxlength="30" className={errors.passwordConfirmation && 'vermelho' } {...register('passwordConfirmation')}/>
          <button type="submit" className="cadastrar">Cadastrar</button>
        </form>
      </header>
    </div>
  );
}

export default App;
