<template>
  <footer>
        <iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=12&l=ur1&category=audibleplus&banner=0MG2XKQ7PYPP84NBNFR2&f=ifr&linkID=bbc510b7bd6398e37e8cbbf135a663c0&t=ggfiction-20&tracking_id=ggfiction-20" width="300" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0" sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"></iframe>
        <div>
            <socialMedia/>
            <img src="../assets/images/gg-fiction-logo.png" alt="gg fiction logo">
            <p>    
                Copyright &copy; 2022 GG Fiction<br />
                <a href="mailto:contact@ggfiction.com">contact@ggfiction.com</a>
            </p>
        </div>
    </footer>
</template>

<script>
import socialMedia from "../components/Social-media-section.vue"
export default {
    components: {
        socialMedia
    }
}
</script>

<style lang="css" scoped >
img {
  width: 5rem;
  height: 5rem;
}

footer {
    grid-column: 1/-1;
    grid-row: 4/5;
    display:flex;
    color:  rgb(240, 240, 240);
    font-size: .70em;
    font-style: italic;
    text-align: center;
    padding: 1em;  
    justify-content: space-evenly;
    align-items: center;
    margin-top: 5rem;
}

footer a {
    color:  rgb(240, 240, 240);
}
</style>