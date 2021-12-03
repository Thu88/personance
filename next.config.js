const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        console.log(phase)
      return {
        env: {
          NEXTAUTH_URL: 'http://localhost:3000'
        }
      }

    return {
        env: {
          NEXTAUTH_URL: 'https://personance.herokuapp.com'
        }
    }
  }
}
