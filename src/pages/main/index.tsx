import React from 'react';
import Api from '../../Api';
import { observer } from 'mobx-react-lite';
import repositories from '../../store/repositories';

const Main: React.FC = observer(() => {
  const  data = Api.getRepositories().then((res) => res.data).catch((e) => console.log(e)
  );
  console.log(data);
  // const lang = Api.getLanguages('https://api.github.com/repos/fabrice126/BeerMarket/languages').then((res) => res)
  // console.log(lang)
  // repositories.addRepositories(data)
  
  return (
    <>
        <div>
            <p>Main</p>
        </div>
    </>
  );
})

export default Main;
