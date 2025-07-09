<script lang="ts">
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    export let steps: {title:string, description:string}[] = [];
</script>

<Carousel.Root
  opts={{
    align: "start",
  }}
  class="select-none w-full flex flex-col justify-center gap-6 pt-6 md:pt-10"
>
  <Carousel.Content>
    {#each steps as step, i (i)}
      <Carousel.Item class="border-r-1 last:border-r-0 basis-1/1 sm:basis-1/2 lg:basis-1/3">
        <div
            class="relative group peer hover:[--hovered:'true']"
            style={`--index:${i + 1}`}
          >
            <div class="p-6 h-65 md:h-70 flex flex-col">
              <div class="mb-8">
                <h3 class="text-5xl font-normal text-main-heading-color group-hover:text-sub-heading-color transition-colors duration-300">
                  0{i + 1}
                </h3>
              </div>

              <div class="flex-1"></div>
              
              <div class="">
                <div class="w-full">
                  <div class="mb-2">
                    <h3 class="text-[18px] leading-[22px] text-xl font-bold tracking-[0.02em] font-manrope text-main-heading-color">
                      {step.title}
                    </h3>
                  </div>
                  <div class="transition-all duration-600 ease-in-out md:opacity-0 translate-x-0 md:translate-x-8 md:max-h-0 overflow-hidden group-hover:opacity-100 group-hover:translate-x-0 group-hover:max-h-35">
                    <p class="pr-4 small-text lg:text-para font-inter text-fourth-color">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </Carousel.Item>
    {/each}
  </Carousel.Content>
</Carousel.Root>