<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { innerWidth } from "svelte/reactivity/window";
  export let casestudies: any[] = [];
  export let baseUrl: string = "";
</script>

<Carousel.Root
  opts={{
    align: "start",
    loop: true,
  }}
  class="w-full flex flex-col justify-center p-1"
>
  <Carousel.Content>
    {#each casestudies as casestudy, i (i)}
      <Carousel.Item class="md:basis-1/2 lg:basis-1/3">
        <a
          target="_blank"
          href={`${baseUrl}/case-studies/${casestudy.data.attachments}`}
          aria-label="Learn more about ${casestudy.data.title}"
        >
        <div class="flex justify-center h-full">
          <Card.Root class="bg-card-bg border-card-border">
            <div class="h-full flex flex-col justify-between">
              <Card.Header
                class="p-0 bg-white rounded-t-[12px] overflow-hidden"
              >
                <img
                  alt="feature"
                  class=" h-[250px] md:h-[300px]"
                  src={casestudy.data.image.src}
                />
              </Card.Header>
              <Card.Content class="md:pb-2">
                <span
                  class="font-bold font-manrope text-[14px] leading-[22px] md:text-[16px] md:leading-[24px] tracking-[16%] text-[#737373] uppercase"
                >
                  {casestudy.data.category}</span
                >
                <Card.Title
                  class="mb-4 mt-2 font-bold font-manrope text-[20px] leading-[26px] tracking-[0.02em] text-fifth-color"
                >
                  <p>
                    {casestudy.data.title}
                  </p>
                </Card.Title>
                <p
                  class="text-[14px] leading-[22px] md:text-[16px] md:leading-[26px] tracking-[0.02em] text-fourth-color"
                >
                  {casestudy.data.description}
                </p>
              </Card.Content>
              <Card.Footer class="mt-4 flex justify-between">
                <div class="flex flex-wrap gap-2">
                  {#each casestudy.data.tags as tag}
                    <span
                      class="text-[12px] leading-[20px] md:text-[16px] md:leading-[26px] tracking-[0.01em] text-[#525252] bg-[#F5F5F5] px-4 py-2 rounded-full"
                    >
                      {tag}
                    </span>
                  {/each}
                </div>
              </Card.Footer>
            </div>
          </Card.Root>
        </div>
        </a>
      </Carousel.Item>
    {/each}
  </Carousel.Content>
  <!-- {#if casestudies.length > 3} -->
  <div
    class={`md:absolute md:top-[-84px] right-0 gap-3 justify-center max-md:mt-6 ${(innerWidth.current as number) > 768 && casestudies.length > 3 ? "flex" : (innerWidth.current as number) < 768 && casestudies.length >= 2 ? "flex" : "hidden"}`}
  >
    <Carousel.Previous />
    <Carousel.Next />
  </div>
  <!-- {/if} -->
</Carousel.Root>
