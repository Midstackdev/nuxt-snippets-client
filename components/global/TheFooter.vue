<template>
    <div class="mt-24 mb-12">
        <div class="container flex flex-wrap lg:flex-no-wrap justify-between">
            <ul class="flex items-center mb-6 lg:mb-0">
                <li>
                    <nuxt-link
                        class="text-gray-500 text-sm mb-2 inline-block"
                        :to="{
                            name: 'index'
                        }"
                    >
                        Home
                    </nuxt-link>

                    <div class="text-gray-500 text-sm">
                        &copy; Codecourse Ltd 2020. All rigths reserved.
                    </div>
                </li>
            </ul>
            <ul class="flex flex-wrap lg:flex-no-wrap items-end">
                <li class="mr-8 w-full lg:w-auto">
                    <a 
                        class="text-gray-500 text-sm"
                        href="https://codecourse.com"
                        target="_blank"
                        rel="noopener" 
                    >
                        codecourse.com
                    </a>
                </li>
                <li class="mr-8 w-full lg:w-auto">
                    <a 
                        class="text-gray-500 text-sm"
                        href="https://codecourse.com"
                        target="_blank"
                        rel="noopener" 
                    >
                        Terms
                    </a>
                </li>
                <li class="mr-8 w-full lg:w-auto">
                    <a 
                        class="text-gray-500 text-sm"
                        href="https://codecourse.com"
                        target="_blank"
                        rel="noopener" 
                    >
                        Privacy poicy
                    </a>
                </li>
                <li class="mr-8 w-full lg:w-auto">
                    <a 
                        class="text-gray-500 text-sm"
                        href="mailto:snippets@codecource.com"
                    >
                        snippets@codecource.com
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>