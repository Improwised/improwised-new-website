<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Menu, X, Moon, Sun } from "lucide-svelte";
    import { onMount } from "svelte";

    let theme = $state({darkTheme: false})
    let darkModeBtn: HTMLElement | null = $state(null);
    let lightModeBtn: HTMLElement | null = $state(null);
    let htmlElement: HTMLCollectionOf<HTMLHtmlElement> | null = $state(null)
            
    onMount(() => {        
        darkModeBtn = document.getElementById("moon") ;
        lightModeBtn = document.getElementById("sun") ;
        htmlElement = document.getElementsByTagName('html') ;
        setTheme()
    })

    const turnDarkMode = () => {
        theme.darkTheme = true;
        localStorage.setItem("theme", "dark")
        darkModeBtn?.classList.add('hidden')
        lightModeBtn?.classList.remove('hidden')
        htmlElement && htmlElement[0].classList.add('dark', 'bg-background')
    }
    
    const turnLightMode = () => {
        theme.darkTheme = false;
        localStorage.setItem("theme", "light")
        lightModeBtn?.classList.add('hidden')
        darkModeBtn?.classList.remove('hidden')
        htmlElement && htmlElement[0].classList.remove('dark', 'bg-background')
    }

    function setTheme() {        
        const themeMode = localStorage.getItem("theme");
        if(themeMode == "dark") {
            turnDarkMode();
        } else {
            turnLightMode()
        }
    }
</script>

{#if theme.darkTheme}
    <Button variant="" id="sun" aria-label="light-mode-btn" class="hover:cursor-pointer p-0 toggle-theme" on:click={turnLightMode}>
        <Sun class="h-5 w-5" />
    </Button>
{:else}
    <Button variant="" id="moon" aria-label="dark-mode-btn" class="hover:cursor-pointer p-0 toggle-theme" on:click={turnDarkMode}>
        <Moon class="h-5 w-5" />
    </Button>
{/if}


