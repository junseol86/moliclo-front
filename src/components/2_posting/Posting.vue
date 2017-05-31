<template>
  <div id="main-page">
    <top-bar v-bind:props="topBarProps"></top-bar>
    <div id="posting-wrapper" class="_float_con">
    </div>
  </div>
</template>

<script>
  import TopBar from '../0_shared/TopBar'
  import secrets from '../../utils/secrets.js'
  
  export default {
    components: {TopBar},
    name: 'posting',
    data () {
      return {
        topBarProps: {
          location: 'posting'
        },
        // 포스팅을 역순으로 다운로드한다.  포스팅이 다른 포스팅으로부터 이어붙이거나
        // 갈라져 나온 것일 경우 최초 포스팅까지 순서대로 도달하기 위함이다.
        //
        // 모든 포스팅과 카드들이 로드되었는지 여부
        allLoaded: false,
        // 전체 카드들
        cards: []
      }
    },
    methods: {
      getPosting: function (postingIdx, cardsPerPage, args) {
        this.$http.get(`${secrets.server.dev}/postings/${postingIdx}?last=${args.lastCard}`)
          .then((result) => {
            args.currentPosting = result.data
            args.currentPosting.cards = []
            this.getCards(postingIdx, 0, cardsPerPage, args)
          })
      },
      getCards: function (postingIdx, page, cardsPerPage, args) {
        console.log(`${secrets.server.dev}/cards?posting=${postingIdx}&page=${page}&per_page=${cardsPerPage}&last=${args.lastCard}`)
        this.$http.get(`${secrets.server.dev}/cards?posting=${postingIdx}&page=${page}&per_page=${cardsPerPage}&last=${args.lastCard}`)
        .then((result) => {
          args.currentPosting.cards = args.currentPosting.cards.concat(result.data)
          console.log(args.currentPosting)
          if (args.currentPosting.cards.length < args.currentPosting.card_total) {
            // 현재 로드중인 포스팅의 카드가 모두 로드되지 않았을 때
            this.getCards(postingIdx, page + 1, cardsPerPage, args)
          } else {
            // 현재 로드중인 포스팅의 카드가 모두 로드되었을 때
            args.cards = args.currentPosting.cards.concat(args.cards)
            if (args.currentPosting.posting.prev_post !== 0) {
              // 이 포스팅이 로드할 마지막(순서로는 첫번째) 포스팅일 때
              args.lastCard = args.currentPosting.posting.prev_card
              this.getPosting(args.currentPosting.posting.prev_post, cardsPerPage, args)
            } else {
              // 다음 포스팅을 로드해야 할 때
              console.log(args)
            }
          }
        })
      }
      // 중간에서 갈라져나온 포스트일 때 에러가 나고 있다
    },
    activated () {
      this.getPosting(this.$route.params.posting, 1, {lastCard: 0, cards: []})
    }
  }
</script>

<style scoped lang="scss">
  #posting-wrapper {
    padding: 64px 16px 16px 16px;
    margin: 0 auto;
  }
</style>
