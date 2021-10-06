import React from 'react';
import Api from '../../Api';
import { observer } from 'mobx-react-lite';

const Main: React.FC = observer(() => {
  const api = Api.getRepositories().then((res) => res)
  console.log(api);
  const lang = Api.getLanguages('https://api.github.com/repos/fabrice126/BeerMarket/languages').then((res) => res)
  console.log(lang)
  
  return (
    <>
        <div>
            <p>Main</p>
        </div>
    </>
  );
})

export default Main;
