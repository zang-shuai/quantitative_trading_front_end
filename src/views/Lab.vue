<template>
  <div class="d-flex flex-column flex-shrink-0 bg-light lefticon">
    <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
      <li class="nav-item">
        <router-link :to="{name:'LabChooseStock'}" class="nav-link py-3 border-bottom" aria-current="page"
                     data-bs-toggle="tooltip"
                     data-bs-placement="right">
          <svg t="1649161285992" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns=" http://www.w3.org/2000/svg"
               p-id="3189" width="24" height="24">
            <path
                d="M899.2 259.008c78.08 84.48 80.96 218.496 8.64 306.688l-8.704 9.92-63.552-60.352c49.728-53.76 49.728-142.08 0-195.84-45.824-49.536-117.504-52.032-165.888-7.488l-7.424 7.488L512 481.92 361.728 319.36c-48.192-52.096-125.12-52.096-173.312 0-47.104 51.008-49.6 132.928-7.424 187.136l7.424 8.768 355.392 384.384-63.616 60.352-355.328-384.384c-81.152-87.68-81.152-228.864 0-316.608 79.68-86.144 208.256-89.216 291.392-9.216l9.088 9.216L512 352.768l86.656-93.76c82.624-89.344 217.856-89.344 300.48 0z m-112.704 349.504l-0.064 113.472h112v88.32h-112v113.536h-87.04l-0.064-113.536h-112v-88.32h112V608.512h87.168z"
                fill="#333333" p-id="3190"></path>
          </svg>
        </router-link>
      </li>
      <li>
        <!--        <router-link to="/lab" class="nav-link py-3 border-bottom" data-bs-toggle="tooltip"-->
        <router-link :to="{name:'LabMarket'}" class="nav-link py-3 border-bottom" data-bs-toggle="tooltip"
                     data-bs-placement="right">
          <svg t="1649161364146" class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
               p-id="3465" width="24" height="24">
            <path
                d="M928 838.848H183.488V96H96v832h832v-89.152zM378.048 739.84V417.92H290.56v321.92h87.488z m252.8 0V289.152H543.36v450.688h87.552z m233.216 0V96h-87.488v643.84h87.488z"
                fill="#333333" p-id="3466"></path>
          </svg>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'LabOneStock'}" class="nav-link py-3 border-bottom" data-bs-toggle="tooltip"
                     data-bs-placement="right">
          <svg t="1649161338340" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="3326" width="24" height="24">
            <path
                d="M185.6 96.448v742.848h742.4v89.6h-832V96.448h89.6z m742.4 95.744v7.424l-238.912 300.48 0.704 0.64-38.208 46.656-8.704 10.88-0.192-0.128-9.6 11.776L508.032 463.36l-198.848 249.28-68.672-56.896L496 335.616l125.248 106.752 116.608-146.752-92.992-76.736 21.184-26.688H928z"
                fill="#333333" p-id="3327"></path>
          </svg>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'LabOptional'}" class="nav-link py-3 border-bottom" data-bs-toggle="tooltip"
                     data-bs-placement="right">
          <svg t="1649161438721" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="3743" width="24" height="24">
            <path
                d="M512 64a448 448 0 1 1 0 896A448 448 0 0 1 512 64z m0 89.6a358.4 358.4 0 1 0 0 716.8A358.4 358.4 0 0 0 512 153.6zM436.544 305.088l75.776 135.104 76.032-135.104H691.2L615.168 440.192h70.528v89.6H556.864v38.4h128.832v89.6H556.864v77.632h-89.6v-77.568H339.392v-89.6H467.2v-38.4H339.392v-89.6L409.6 440.192 333.888 305.088h102.656z"
                fill="#333333" p-id="3744"></path>
          </svg>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'LabTrading'}" class="nav-link py-3 border-bottom" data-bs-toggle="tooltip"
                     data-bs-placement="right">
          <svg t="1649161382045" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="3604" width="24" height="24">
            <path
                d="M494.528 64a430.464 430.464 0 0 1 335.424 700.352l129.728 129.792-65.536 65.536-129.792-129.728A430.464 430.464 0 1 1 494.528 64z m0 92.736a338.176 338.176 0 0 0-337.792 337.792 338.176 338.176 0 0 0 337.792 337.728 338.176 338.176 0 0 0 337.728-337.728 338.176 338.176 0 0 0-337.728-337.792z"
                fill="#333333" p-id="3605"></path>
          </svg>
        </router-link>
      </li>
    </ul>
  </div>
  <router-view style="margin-left: 3.8em"/>
</template>

<script>
import axios from 'axios'
import {reactive} from "vue";
import $store from "../store"


export default {
  name: "Lab",
  mounted() {
    axios.get('http://127.0.0.1:8080/api/get_concepts').then(
        function (response) {
          $store.state.stock.concepts = response.data.data
        }
    ).catch(function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
.lefticon {
  width: 3.8em;
  position: sticky;
  float: left;
}
</style>