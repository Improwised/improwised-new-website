<script lang="ts">
  import * as Accordion from "$lib/components/ui/accordion";

  export let faqs: { question: string; answer: string }[] = [];
  export let blocks : {title: string; slug:string; description: string}[] = [];  
  export let baseUrl : string = "";
  export let servicePage : string = "";
</script>

<div>
  {#if blocks.length > 0}
    {#each blocks as block}
      <div class="pt-4 pb-4 md:pb-5 text-left hover:text-blue-hover text-first-color font-bold text-[16px] leading-[22px] md:text-[22px] md:leading-[28px] tracking-[0.02em] font-manrope border-b-1">
        {#if servicePage === 'platform-engineering'}          
          <a class="text-first-color hover:text-blue-hover" {...(servicePage === 'platform-engineering' && {
            href: `${baseUrl}/services/${servicePage}/${block.slug}/`
          })}>
            {block.title}
          </a>
        {:else}
          {block.title}
        {/if}
      </div>
    {/each}
  {:else}
    <Accordion.Root >
      {#each faqs as faq (faq.question)}
        <Accordion.Item value={faq.question} class="" >
          <Accordion.Trigger class="no-underline hover:cursor-pointer font-bold text-left hover:no-underline py-4 md:py-6 text-first-color text-[16px] leading-[22px] md:text-[22px] md:leading-[28px] tracking-[0.02em] font-manrope">{faq.question}
          </Accordion.Trigger>
          <Accordion.Content class="text-left"><p class="pb-4 text-left small-text font-inter md:text-para text-third-color">{faq.answer}</p></Accordion.Content>
        </Accordion.Item>
      {/each}
    </Accordion.Root>
  {/if}
</div>

