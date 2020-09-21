<template>
  <nav>
    Hier steht die aktuelle route
  </nav>
  <!-- <div id="blue"></div> -->
  <router-view />
</template>

<style lang="scss">
@font-face {
  font-family: "muli";
  src: local("muli"), url(./assets/Muli-Regular.ttf) format("truetype");
}

body,
#app {
  margin: 0;
  height: 100vh;
  width: 100vw;
  top: 0;
  position: absolute;
  overflow: hidden;
}

#app {
  font-family: muli, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  background-color: #9b9b9b;
  // filter: greyscale(100%) hue-rotate(180deg) brightness(100%) contrast(90%)
  //   saturate(200%);
  // filter: sepia(100%) hue-rotate(190deg) brightness(80%) saturate(450%);
}

nav {
  width: 100%;
  height: 38pt;
  background-color: #f2f2f2;
  z-index: 1200;
  -webkit-box-shadow: 0px 4pt 28pt 0px rgba(0, 0, 0, 0.38);
  -moz-box-shadow: 0px 4pt 28pt 0px rgba(0, 0, 0, 0.38);
  box-shadow: 0px 4pt 28pt 0px rgba(0, 0, 0, 0.38);
}
</style>
