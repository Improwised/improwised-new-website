<script>
    export let items = [];
</script>

<aside class="sticky top-24">
    <h3 class="font-bold mb-4">Table of Contents</h3>
    <ul class="space-y-2">
        {#each items as item}
            <li>
                <a 
                    href={`#${item.anchor}`} 
                    class="text-sm hover:text-blue-500 transition-colors"
                >
                    {item.text}
                </a>
            </li>
        {/each}
    </ul>
</aside>
