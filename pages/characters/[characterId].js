export default function Character({ character }) {
  console.log(character, 'character')
  return (
    <div>
      <img src={(character || {}).photoUrl} alt="" />
      <div>
        <h1>{ (character || {}).name }</h1>
        <p>Affiliation: { (character || {}).affiliation }</p>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const characterId = params.characterId.replace(/\-/g, '+')
  const results = await fetch(`https://last-airbender-api.herokuapp.com/api/v1/characters?name=${characterId}`).then(res => res.json());
  return {
    props: {
      character: results[0] || {}
    }
  }
}

export async function getStaticPaths() {
  // const characters = await fetch('https://last-airbender-api.herokuapp.com/api/v1/characters?perPage=500').then(res => res.json());
  // return {
  //   paths: characters.map(character => {
  //     const characterId = character.name.toLowerCase().replace(/ /g, '-').replace(/\'/, '').replace(/\(.+\)/, '');
  //     return {
  //       params: {
  //         characterId
  //       }
  //     }
  //   }).filter(({ params }) => !!params.characterId),
  //   fallback: false
  // }
  return { paths: [], fallback: true }
}