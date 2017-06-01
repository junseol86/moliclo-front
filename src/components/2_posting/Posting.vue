<template>
  <div id="posting">
    <top-bar v-bind:props="topBarProps"></top-bar>
    <div id="posting-wrapper" class="_float_con">
      <div class="card-container" v-for="card in cards">
        <card v-bind:card="card"></card>
      </div>
    </div>
  </div>
</template>

<script>
  import TopBar from '../0_shared/TopBar'
  import Card from './Card'
  import secrets from '../../utils/secrets.js'
  
  export default {
    components: {TopBar, Card},
    name: 'posting',
    data () {
      return {
        topBarProps: {
          location: 'posting'
        },
        // 전체 카드들
        cards: []
      }
    },
    methods: {
      // 포스팅을 역순으로 다운로드한다.  포스팅이 다른 포스팅으로부터 이어붙이거나
      // 갈라져 나온 것일 경우 최초 포스팅까지 순서대로 도달하기 위함이다.
      // Stateless한 사이트를 위해 functional한 방식으로 구현
      getPosting: function (postingIdx, cardsPerPage, args) {
        this.$http.get(`${secrets.server.dev}/postings/${postingIdx}?last=${args.lastCard}`)
          .then((result) => {
            args.currentPosting = result.data
            args.currentPosting.cards = []
            this.getCards(postingIdx, 0, cardsPerPage, args)
          })
      },
      getCards: function (postingIdx, page, cardsPerPage, args) {
        this.$http.get(`${secrets.server.dev}/cards?posting=${postingIdx}&page=${page}&per_page=${cardsPerPage}&last=${args.lastCard}`)
        .then((result) => {
          args.currentPosting.cards = args.currentPosting.cards.concat(result.data)
          if (args.currentPosting.cards.length < args.currentPosting.card_total) {
            // 현재 로드중인 포스팅의 카드가 모두 로드되지 않았을 때
            this.getCards(postingIdx, page + 1, cardsPerPage, args)
          } else {
            // 현재 로드중인 포스팅의 카드가 모두 로드되었을 때
            // 로드한 포스팅의 첫번째 카드에 포스팅의 정보를 넣어준다.
            // (포스팅 페이지에서 첫번째 카드에 작성자 정보가 나타나도록)
            args.currentPosting.cards[0].postingInfo = args.currentPosting.posting
            args.cards = args.currentPosting.cards.concat(args.cards)
            if (args.currentPosting.posting.prev_post !== 0) {
              // 다음 포스팅을 로드해야 할 때
              args.lastCard = args.currentPosting.posting.prev_card
              this.getPosting(args.currentPosting.posting.prev_post, cardsPerPage, args)
            } else {
              // 이 포스팅이 로드할 마지막(순서로는 첫번째) 포스팅일 때
              this.cards = args.cards
            }
          }
        })
      }
    },
    activated () {
      this.cards = []
      this.getPosting(this.$route.params.posting, 2, {lastCard: 0, cards: []})
    }
  }
</script>

<style scoped lang="scss">
  #posting-wrapper {
    margin: 72px auto;
  }
  
  @media only screen and (min-width: 1024px) {
    #posting-wrapper {
      width: 880px;
      margin: 72px auto;
    }
  }

</style>
