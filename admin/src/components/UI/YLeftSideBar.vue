<template>
  <article class="side_bar">
    <header class="side_bar__header">
      <img src="@/assets/img/logo.png" alt="logo" class="header__img">
      <h1 class="header__heading"><span class="heading__name">Reply 2.0</span> | <span class="heading__product">Admin</span></h1>
      <hr class="header__line">
    </header>
    <nav class="side_bar__nav">
      <router-link to="/company" active-class="nav__link_active" class="link nav__link">Компании</router-link>
      <router-link to="/block" active-class="nav__link_active" class="link nav__link">Блоки</router-link>
      <router-link to="/test" active-class="nav__link_active" class="link nav__link">Тесты</router-link>
      <router-link to="/results" active-class="nav__link_active" class="link nav__link">Результаты</router-link>
    </nav>
  </article>
</template>

<script>
export default {
  name: "YLeftSideBar"
}
</script>

<style scoped>
.side_bar {
  position: sticky;
  top: 0;
  font-size: 1.5625rem;
  height: 100vh;
  padding: .875rem;
  background: linear-gradient(140.62deg, rgba(255, 255, 255, 0.25) 2.81%, rgba(255, 255, 255, 0.1) 100.82%);
  box-shadow: 0 4px 52px rgba(143, 0, 255, 0.11);
  border-radius: 0 1rem 1rem 0;
}
.side_bar__header {
  display: grid;
  grid-template-columns: min-content max-content;
  grid-gap: 1.5rem 1rem;
  align-items: center;
}
.header__heading {
  margin-right: 1rem;
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--light-opacity);
}
.header__img {
  width: 3.1875rem;
  height: auto;
  margin-left: 1rem;
}
.heading__name {
  font-weight: 600;
}
.heading__product {
  font-weight: 400;
}
.heading__product,
.heading__name {
  color: var(--light);
}
.header__line {
  grid-column: span 2;
  border-bottom: 3px solid hsla(0, 0%, 100%, 0.27);
}

.side_bar__nav {
  padding: 1.125rem 2rem;
  display: grid;
  grid-gap: 1rem;
}
.nav__link {
  font-weight: 400;
}
.nav__link_active {
  font-weight: 500;
}
</style>
