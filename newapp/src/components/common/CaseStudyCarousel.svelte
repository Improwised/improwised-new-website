<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import line from "$lib/images/line.svg";
  export let casestudies: any[] = [];
</script>

<Carousel.Root
  opts={{
    align: "start",
    loop: true,
  }}
  class="w-full flex flex-col justify-center gap-6"
>
  <Carousel.Content>
    {#each casestudies as casestudy, i (i)}
      <Carousel.Item class="md:basis-1/2 lg:basis-1/3">
        <div class="flex justify-center p-1 h-full">
          <Card.Root
            class="relative bg-card-bg border-card-border flex w-full max-w-md shrink-0 snap-start snap-always scroll-m-5 flex-col justify-between hover:shadow-lg h-full"
          >
            <Card.Header class="mb-4">
              <span
                class="mb-2 font-bold font-manrope text-[16px] leading-[24px] tracking-[16%] text-[#737373] uppercase"
              >
                {casestudy.data.category}</span
              >
              <a
                target="_blank"
                href={`/case-studies/${casestudy.data.attachments}`}
                aria-label="Learn more about ${casestudy.data.title}"
                ><h2
                  class="mb-2 font-bold font-manrope text-[28px] leading-[34px] tracking-[0.02em] text-first-color"
                >
                  {casestudy.data.title}
                </h2></a
              >

              <blockquote class="text-para text-fourth-color">
                {casestudy.data.description}
              </blockquote>
            </Card.Header>

            <!-- <Card.Footer class="block">
              <img src={line.src} alt="line" class="w-full mt-4 d-block" />

              <div class="mt-6 flex items-center justify-between gap-3 w-full">
                <div class="flex-1">
                  <h2 class="font-manrope font-bold text-[40px] text-[#549F57]">
                    {casestudy.data.saveCost}
                  </h2>
                  <p class="text-para">Saved in operational costs</p>
                </div>
              </div>
            </Card.Footer> -->
          </Card.Root>
        </div>
      </Carousel.Item>
    {/each}
  </Carousel.Content>

  <div class="md:absolute md:top-[-95px] right-0 flex gap-3 justify-center">
    <Carousel.Previous />
    <Carousel.Next />
  </div>
</Carousel.Root>
