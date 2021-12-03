const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_SERVER} = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  let url = 'https://personance.herokuapp.com/api/auth';

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    url = 'http://localhost:3000';
  }
  
  return {
    env: {
      NEXTAUTH_URL: url
    }
  }
  
}

