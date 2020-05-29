<template>
  <div>
    Scrapper
  </div>
</template>

<script>
const cheerio = require('cheerio')
import html from './html'

export default {
  name: 'Scrapper',

  async created() {
    if (process.server) return

    const identifier = text => {
      var range = Array(text.length)
      for (var i = 0; i < text.length; i++) {
        range[i] = i
      }
      return Array.prototype.map
        .call(range, function(i) {
          return text.charCodeAt(i).toString(16)
        })
        .join('')
    }

    const category = 'entertainment'
    const source = 'https://www.chiquipedia.com/cuestionarios/test-dibujos-animados/'
    const difficulty = 'kids'

    const $questions = cheerio.load(html)

    // const answers =
    //   '<p><strong>1.</strong> Alemania <strong>2.</strong> El noruego Magnus Carlsen <strong>3.</strong> Marc Márquez <strong>4. </strong>En Barcelona <strong>5.</strong> En 1930 <strong>6.</strong> Michael Jordan <strong>7.</strong> Usain Bolt <strong>8.</strong> Brasil, con cinco mundiales <strong>9.</strong> En Valencia <strong>10.</strong> En Rosario <strong>11.</strong> En Urbino <strong>12.</strong> Muay thai <strong>13.</strong> Los Angeles Galaxy <strong>14.</strong> Gran Bretaña <strong>15.</strong> Negro, rojo, azul, amarillo y verde <strong>16.</strong> Tres<strong> 17.</strong> Thomas Gravesen <strong>18.</strong> El críquet <strong>19.</strong> Roger Federer y Margaret Court <strong>20.</strong> Charlotte Cooper <strong>21.</strong> Nadia Comăneci <strong>22.</strong> Eddie el Águila <strong>23.</strong> La capoeira <strong>24.</strong> San Antonio Spurs <strong>25.</strong> Tanto Jack Nicklaus como Tiger Woods se consideran los mejores golfistas de todos los tiempos.</p>'
    // const matches = $questions('.wpProQuiz_question')
    const matches = $questions('.wpProQuiz_answerCorrect')

    matches.each((index, element) => {
      const question = element.parent.parent.children[1].children[1].children[0].data
      const answer1 = element.parent.children[1].children[3].children[2].data.trim()
      const answer2 = element.parent.children[2].children[3].children[2].data.trim()
      const answer3 = element.parent.children[3].children[3].children[2].data.trim()
      const answer4 = element.parent.children[4].children[3].children[2].data.trim()
      const answer = element.children[3].children[2].data.trim()
      // const number = index + 1
      // const end = index == matches.length - 1 ? '</p>' : `<strong>\\s?${number + 1}\\.\\s?</strong>`
      // let expression = new RegExp(`${number}\\.\\s?</strong>(.*)${end}`)
      // let match = answers.match(expression)
      // const answer = match[1].trim()

      const data = {
        question,
        answer,
        category,
        source,
        difficulty,
        options: [answer1, answer2, answer3, answer4],
      }
      console.log(data)

      // this.$fireStore
      //   .collection('questions')
      //   .doc(identifier(question))
      //   .set(data)
    })
  },
}
</script>
