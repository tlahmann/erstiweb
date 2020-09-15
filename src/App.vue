<template>
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
  text-align: center;
  color: #2c3e50;
  background-color: #9b9b9b;
  // filter: sepia(60%) hue-rotate(185deg) saturate(250%);
}
</style>
