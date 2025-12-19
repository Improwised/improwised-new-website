<script lang="ts">
    import { cn } from "$lib/utils.js";
    export let text: string;
    export let primaryColorText: string;
    export let isPrimaryTextInitial: boolean;
    export let isBlogFaqs: boolean;
    let className: string | undefined | null = undefined;
    export let dataAos: string = isBlogFaqs ? "" : "fade-up";
    export { className as class };
    const computedClass = cn
        ? cn(
              "mb-6 max-md:text-center font-manrope text-[32px] md:text-[46px] leading-[36px] -tracking-2 md:leading-[52px] font-bold text-main-heading-color",
              className,
          )
        : `mb-6  max-md:text-center font-manrope text-[32px] md:text-[46px] leading-[36px] -tracking-2 md:leading-[52px] font-bold text-main-heading-color ${className}`.trim();
</script>

<h2 id="faqs" class={computedClass} data-aos={dataAos}>
    {#if isPrimaryTextInitial && primaryColorText}
        <span class="text-sub-heading-color">{primaryColorText}</span>
    {/if}
    {text}
    {#if !isPrimaryTextInitial && primaryColorText}
        <span class="text-sub-heading-color">{primaryColorText}</span>
    {/if}
</h2>
