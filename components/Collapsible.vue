<script setup lang="ts">
const toggle = ref(false);

/**
 * Code to dynamiccaly set maxHeight property to the scrollHeight of the Content
 * to ensure the duration of the transition is precise compared to a fix height (eg 2000px).
 * Explanation: 
 * For example, if your content's actual height is 200px, but the max-height is set to 2000px, the transition will complete once it reaches 200px, which will be much quicker than the specified time (eg 0.9 sec).
 */
function beforeEnter(el: Element) {
    (el as HTMLElement).style.maxHeight = '0';
};
function enter(el: Element) {
    (el as HTMLElement).style.maxHeight = el.scrollHeight + 'px';
};
function beforeLeave(el: Element) {
    (el as HTMLElement).style.maxHeight = el.scrollHeight + 'px';
};

// The setTimeout in the leave method is necessary to ensure the max-height is updated after the beforeLeave transition has completed.
function leave(el: Element) {
    setTimeout(() => {
        (el as HTMLElement).style.maxHeight = '0';
    }, 0);
};
</script>

<template>
    <div class="wrapper">
        <div class="collapsible-title cursor-pointer" @click="toggle = !toggle">
            <span class="placeholder"></span>
            <div class="title">
                <slot name="title">More Infos..</slot>
            </div>
            <h3 class="plusBTN">➕</h3>
        </div>
        <Transition name="slideContent" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave"
            @leave="leave">
            <div class="collapsible-content" v-if="toggle">
                <slot name="content"></slot>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.wrapper {
    border: 1px solid rebeccapurple;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1em;
}

.collapsible-title {
    /* border: 1px solid orange; */
    width: 100%;
    display: flex;
    padding: 0.66em 0;
}

.title {
    width: 80%;
}

.plusBTN {
    flex: 1;
}

.collapsible-content {
    /* border: 1px solid; */
    width: 100%;
    border-color: darkturquoise;
    border-top: 1px solid rebeccapurple;
    padding: 1em 0;

}

.slideContent-enter-active {
    transition: max-height 0.2s ease-in-out;
    overflow: hidden;
}

.slideContent-leave-active {
    transition: max-height 0.2s ease-in-out;
    overflow: hidden;
}

.slideContent-enter-from,
.slideContent-leave-to {
    max-height: 0;
}


</style>