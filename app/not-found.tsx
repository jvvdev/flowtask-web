// pages/404.tsx

import Head from 'next/head';
import { NextPage } from 'next';
import { LinkIcon, HomeIcon, BugAntIcon } from '@heroicons/react/24/outline'; // Ícones do Heroicons

// Define o componente como uma NextPage para tipagem correta
const Custom404: NextPage = () => {
  return (
    <>
      {/* Configuração da aba do navegador */}
      <Head>
        <title>404 - Página Não Encontrada</title>
      </Head>

      {/* Container principal: centraliza na tela e define a cor de fundo */}
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        
        {/* Card branco central: a área principal do erro */}
        <div className="w-full max-w-2xl rounded-xl p-10 text-center">
          

          {/* Código do Erro e Título */}
          <h1 className="mb-3 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            404
          </h1>
          <h2 className="mb-6 text-2xl font-semibold text-gray-700">
            Página Não Encontrada
          </h2>

          {/* Mensagem de Erro */}
          <p className="mx-auto mb-10 max-w-md text-gray-500">
            Ops! Parece que o link que você procurava não existe mais, foi movido ou você digitou incorretamente.
          </p>

          {/* Botões de Ação */}
          <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            
            {/* Botão de Retorno ao Dashboard/Início (Principal) */}
            <a
              href="/dashboard" // Link para a página inicial
              className="inline-flex items-center justify-center rounded-lg border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-md transition duration-300 ease-in-out hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <HomeIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Voltar para o início
            </a>

            {/* Botão para Reportar um Problema (Secundário) */}
            {/* <a
              href="mailto:suporte@seusistema.com" // Substitua pelo seu email de suporte
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-md transition duration-300 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 focus:ring-opacity-50"
            >
              <BugAntIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Reportar um Problema
            </a> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Custom404;