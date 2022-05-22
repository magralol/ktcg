<template>

<main>
  <div class="container py-4">
    
    <div class="p-5 mb-4">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">APP NAME</h1>
        <p class="col-md-8 fs-4">Quickly and easily create operative, Equipment, Strategic Ploy, Tactical Ploy and custom reference cards for your killteams.</p>
        <a href="/rosters" class="btn btn-lg btn-primary">Get Started</a>
      </div>
    </div>

    <div class="row align-items-md-stretch">
      <div class="col-md-6">
        <div class="h-100 p-5 text-white bg-dark rounded-3">
          <h2>Change the background</h2>
          <p>Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.</p>
          <button class="btn btn-outline-light" type="button">Example button</button>
        </div>
      </div>
      <div class="col-md-6">
        <div class="h-100 p-5 text-white bg-dark rounded-3">
          <h2>Version 2</h2>
          <p>[WIP] Version 2 is here with a new look and some added functionalty such as multiple rosters, new roster format, phoneview, installable, battlescribe import (beta) and more.</p>
          <button class="btn btn-outline-light" type="button">Read more</button>
        </div>
      </div>
    </div>
  </div>
</main>

<!--
<div class="d-flex h-100 text-center text-white">
  <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <header class="mb-auto">
      <div>
        <h3 class="float-md-start mb-0">APP NAME</h3>
        <br class="d-block d-sm-block d-md-none">
        <nav class="nav nav-masthead justify-content-center float-md-end">
          <a class="nav-link" :class="(tab == 'home')? 'active' : ''" @click="tab = 'home'" aria-current="page" href="#">Home</a>
          <a class="nav-link" :class="(tab == 'features')? 'active' : ''" @click="tab = 'features'" href="#">Features</a>
          <a class="nav-link" :class="(tab == 'contact')? 'active' : ''" @click="tab = 'contact'">Contact</a>
        </nav>
      </div>
    </header>

    <main class="px-3">
      <div v-show="tab == 'home'" style="margin-top: 20% !important;">
        <h1>APP NAME</h1>
        <p class="lead">Quickly and easily create operative, Equipment, Strategic Ploy, Tactical Ploy and custom reference cards for your killteams.</p>
        <p class="lead">
          <br>
          <a href="/rosters" class="btn btn-lg btn-primary">Get Started</a>
        </p>
      </div>

      <div v-show="tab == 'features'">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
      <div class="col d-flex align-items-start">
        <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#bootstrap"/></svg>
        <div>
          <h4 class="fw-bold mb-0">Featured title</h4>
          <p>Paragraph of text beneath the heading to explain the heading.</p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#cpu-fill"/></svg>
        <div>
          <h4 class="fw-bold mb-0">Featured title</h4>
          <p>Paragraph of text beneath the heading to explain the heading.</p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#calendar3"/></svg>
        <div>
          <h4 class="fw-bold mb-0">Featured title</h4>
          <p>Paragraph of text beneath the heading to explain the heading.</p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#home"/></svg>
        <div>
          <h4 class="fw-bold mb-0">Featured title</h4>
          <p>Paragraph of text beneath the heading to explain the heading.</p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#speedometer2"/></svg>
        <div>
          <h4 class="fw-bold mb-0">Featured title</h4>
          <p>Paragraph of text beneath the heading to explain the heading.</p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#toggles2"/></svg>
        <div>
          <h4 class="fw-bold mb-0">Featured title</h4>
          <p>Paragraph of text beneath the heading to explain the heading.</p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#geo-fill"/></svg>
        <div>
          <h4 class="fw-bold mb-0">Featured title</h4>
          <p>Paragraph of text beneath the heading to explain the heading.</p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#tools"/></svg>
        <div>
          <h4 class="fw-bold mb-0">Featured title</h4>
          <p>Paragraph of text beneath the heading to explain the heading.</p>
        </div>
      </div>
    </div>
      </div>
    </main>
  </div>
</div>
-->
<!--
<div style="text-align: center;">
  
    <br><br>
    <h1>APP NAME</h1>
    <p>Quickly and easily create operative, Equipment, Strategic Ploy, Tactical Ploy and custom reference cards for your killteams.</p>
    <br>
    <div class="mb-5">
      <a href="/rosters" class="btn btn-primary btn-lg px-4">Get Started</a>
    </div>

    <hr>

    <div class="container">
      <div class="row">
        <div class="col">
          <h3>Feature 1</h3>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, ipsam dolores? Ut, neque aperiam. Similique ad quaerat iusto ratione quidem quos quas cumque velit, architecto at eius, quod ullam voluptatem.</p>
        </div>
        <div class="col">
          <h3>Feature 1</h3>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, ipsam dolores? Ut, neque aperiam. Similique ad quaerat iusto ratione quidem quos quas cumque velit, architecto at eius, quod ullam voluptatem.</p>
        </div>
        <div class="col">
          <h3><i class="fa-solid fa-download"></i> Installable</h3>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, ipsam dolores? Ut, neque aperiam. Similique ad quaerat iusto ratione quidem quos quas cumque velit, architecto at eius, quod ullam voluptatem.</p>
        </div>
      </div>
    </div>
    
</div>
-->
</template>

<script setup>
  import { ref } from 'vue';
  
  const tab = ref("home");

</script>

<style scoped>
   .cover-container {
      max-width: 42em;
    }


    /*
    * Header
    */

    .nav-masthead .nav-link {
      padding: .25rem 0;
      font-weight: 700;
      color: rgba(255, 255, 255, .5);
      background-color: transparent;
      border-bottom: .25rem solid transparent;
    }

    .nav-masthead .nav-link:hover,
    .nav-masthead .nav-link:focus {
      border-bottom-color: #fff;
    }

    .nav-masthead .nav-link + .nav-link {
      margin-left: 1rem;
    }

    .nav-masthead .active {
      color: #fff;
      border-bottom-color: #fff;
    }
</style>
