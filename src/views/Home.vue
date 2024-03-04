<template>
  <main>
    <!-- Marketing messaging and featurettes
    ================================================== -->
    <!-- Wrap the rest of the page in another container to center all the content. -->

    <div class="container marketing">

      <!-- Three columns of text below the carousel -->
      <div class="row">
        <div class="col-lg-4">
          <img src="../../public/img/img1.jpeg" width="150" height="150" style="border-radius:100%; overflow:hidden;"/>

          <h2>图形</h2>
          <p>根据自己的喜好选择其中一些进行组合，可以查看自己的行情</p>
          <p><router-link class="btn btn-secondary" to="/lab/trading">进入 »</router-link></p>
        </div><!-- /.col-lg-4 -->
        <div class="col-lg-4">
          <img src="../../public/img/img2.jpeg" width="150" height="150" style="border-radius:100%; overflow:hidden;"/>
          <h2>代码</h2>
          <p>通过代码进行交易，并且模拟交易</p>
          <p><router-link class="btn btn-secondary" to="/trade">进入 »</router-link></p>
        </div><!-- /.col-lg-4 -->
        <div class="col-lg-4">
          <img src="../../public/img/img3.jpeg" width="150" height="150" style="border-radius:100%; overflow:hidden;"/>

          <h2>神经网络</h2>
          <p>训练神经网络，通过ai分析，进行交易</p>
          <p><router-link class="btn btn-secondary" to="/ailab">进入 »</router-link></p>
        </div><!-- /.col-lg-4 -->
      </div><!-- /.row -->


      <!-- START THE FEATURETTES -->

      <hr class="featurette-divider">

      <div class="row featurette">
        <div class="col-md-7">
          <h2 class="featurette-heading">图形界面分析</h2>
          <p class="lead">根据自己的喜好选择其中一些进行组合，可以查看自己的行情</p>
        </div>
        <div class="col-md-5">
          <img src="../../public/img/img1.jpeg" width="500" height="500"/>
        </div>
      </div>

      <hr class="featurette-divider">

      <div class="row featurette">
        <div class="col-md-7 order-md-2">
          <h2 class="featurette-heading">代码交易</h2>
          <p class="lead">通过代码进行交易，并且模拟交易</p>
        </div>
        <div class="col-md-5 order-md-1">
          <img src="../../public/img/img2.jpeg" width="500" height="500"/>

        </div>
      </div>

      <hr class="featurette-divider">
      <div class="row featurette">
        <div class="col-md-7">
          <h2 class="featurette-heading">AI分析</h2>
          <p class="lead">训练神经网络，通过ai分析，进行交易</p>
        </div>
        <div class="col-md-5">
          <img src="../../public/img/img3.jpeg" width="500" height="500"/>
        </div>
      </div>
      <hr class="featurette-divider">
    </div>
  </main>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>

</style>