const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_SERVER} = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  let url;

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    url = 'http://localhost:3000';
  } else if (phase === PHASE_PRODUCTION_SERVER) {
    url = 'https://personance.herokuapp.com'
  }
  
  console.log(url)

  return {
    env: {
      NEXTAUTH_URL: url
    }
  }
  
}

