// errorMessage.js: Componente para exibir mensagens de erro

import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/errorMessage.css'; // Importa os estilos CSS específicos para o componente

export default function ErrorMessage({ requestErrorMessage = null }) {
  return (
    <div className='error-message'> {/* Container do componente */}
      <span>
        {requestErrorMessage} {/* Exibe a mensagem de erro */}
      </span>
    </div>
  );
}

ErrorMessage.propTypes = {
  requestErrorMessage: PropTypes.string.isRequired, // Propriedade obrigatória que recebe a mensagem de erro
};
