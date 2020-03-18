<template>
    <div>
        <div class="bg-white mb-16">
            <div class="container py-10 pb-16">
                <div class="w-10/12">
                    <input 
                        type="text" 
                        class="text-4xl text-gray-700 font-medium font-header leading-tight mb-4 w-full block p-2 border-2 rounded border-dashed outline-none"
                        v-model="snippet.title"
                        placeholder="Untitled snippet" 
                    >

                    <div class="text-gray-600">
                        Created by
                        <nuxt-link
                            :to="{}"
                        >
                            Alfred Smith
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
        <!-- {{previousStep}} -->
        <div class="container">
            <div class="flex items-center mb-6">
                <div class="text-xl text-gray-600 font-medium font-header mr-3">
                    {{ currentStepIndex + 1}}/{{ steps.length }}.
                </div>

                <input 
                    type="text" 
                    class="text-xl text-gray-600 font-medium font-header p-2 py-1 bg-transparent border-2 rounded border-dashed outline-none w-full"
                    v-model="currentStep.title"
                    placeholder="Untitled step" 
                >
            </div>

            <div class="flex flex-wrap lg:flex-no-wrap">
                <div class="w-full lg:w-8/12 lg:mr-16 flex flex-wrap lg:flex-no-wrap justify-between items-start mb-8">

                    <div class="flex flex-row lg:flex-col mr-2 order-first">
                        <StepNavigationButton
                            :step="previousStep"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current text-white h-6 w-6"><path d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z"/></svg>
                        </StepNavigationButton>

                        <AddStepButton
                            :snippet="snippet"
                            :currentStep="currentStep"
                            position="before"
                            @added="handleStepAdded"
                        />    
                    </div>

                    <div class="w-full lg:mr-2">
                        <textarea class="w-full mb-6 border-2 border-dashed border-gray-400 rounded-lg outline-none" v-model="currentStep.body">
                        </textarea>
                        <div class="bg-white p-8 rounded-lg text-gray-600">
                            Markdown content
                        </div>
                    </div>

                    <div class="order-first lg:order-last flex flex-row-reverse lg:flex-col">
                        <StepNavigationButton
                            :step="nextStep"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current text-white h-6 w-6"><path d="M18.59 13H3a1 1 0 0 1 0-2h15.59l-5.3-5.3a1 1 0 1 1 1.42-1.4l7 7a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.42-1.4l5.3-5.3z"/></svg>
                        </StepNavigationButton>

                        <AddStepButton
                            :snippet="snippet"
                            :currentStep="currentStep"
                            position="after"
                            @added="handleStepAdded"
                        />    

                        <DeleteStepButton 
                            @deleted="handleStepDeleted"
                            :step="currentStep"
                            :snippet="snippet"
                            v-if="steps.length > 1"
                        />
                    </div>

                </div>

                <div class="w-full lg:w-4/12">
                    <div class="mb-8">
                        <h1 class="text-xl text-gray-600 font-medium mb-6">
                            Steps
                        </h1>

                        <StepList 
                            :steps="orderedStepsAsc"
                            :currentStep="currentStep"
                        />
                    </div>

                    <div class="border-t-2 border-gray-300 py-6">
                        <h1 class="text-xl text-gray-600 font-medium mb-6">
                            Publishing
                        </h1>

                        <div class="text-gray-500 text-sm mb-6">
                            <template v-if="lastSaved">
                                Last saved at {{ lastSavedFormatted }}
                            </template>

                            <template v-else>
                                No changes saved in this session yet
                            </template> 
                        </div>

                        <div class="flex items-baseline">
                            <input 
                                type="checkbox" 
                                name="public" 
                                id="public" 
                                class="mr-2"
                                v-model="snippet.is_public"
                            >

                            <div>
                                <label for="public" class="text-gray-600 font-medium">
                                    Make this public
                                </label>

                                <div class="text-gray-500 text-sm">
                                    Don't worry, you can change this later.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="text-gray-500 text-sm">
                        Use <div class="inline-block px-2 leading-relaxed text-gray-600 rounded bg-gray-400 text-sm">ctrl</div> + <div class="inline-block px-2 leading-relaxed text-gray-600 rounded bg-gray-400 text-sm">shift</div> + <div class="inline-block px-2 leading-relaxed text-gray-600 rounded bg-gray-400 text-sm">left or right</div> on your keyboard to navigate between steps
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import StepList from '../components/StepList'
    import StepNavigationButton from '../components/StepNavigationButton'
    import AddStepButton from './components/AddStepButton'
    import DeleteStepButton from './components/DeleteStepButton'

    import browseSnippet from '@/mixins/snippets/browseSnippet'

    import { debounce as _debounce } from 'lodash'
    import moment from 'moment'

    export default {
        components: {
            StepList,
            StepNavigationButton,
            AddStepButton,
            DeleteStepButton
        },

        data () {
            return {
                snippet: null,
                steps: [],

                lastSaved: null
            }
        },

        mixins: [
            browseSnippet
        ],

        head () {
            return {
                title: `Editing ${this.snippet.title || 'Untitled snippet'}`
            }
        },

        watch: {
            'snippet.title': {
                handler: _debounce(async function (title) {
                   await this.$axios.$patch(`/snippets/${this.snippet.uuid}`, {
                    title
                   })

                   this.touchLastSaved()
                }, 500)
            },

            'snippet.is_public': {
                handler: _debounce(async function (isPublic) {
                   await this.$axios.$patch(`/snippets/${this.snippet.uuid}`, {
                    is_public: isPublic
                   })

                   this.touchLastSaved()
                }, 500)
            },

            currentStep: {
                deep: true,

                handler: _debounce(async function (step) {
                    await this.$axios.$patch(`/snippets/${this.snippet.uuid}/steps/${step.uuid}`, {
                        title: step.title, 
                        body: step.body
                    })

                    this.touchLastSaved()
                }, 500)
            }
        },

        computed: {
            lastSavedFormatted () {
                return moment(this.lastSaved).format('hh:mm:ss')
            }
        },

        methods: {
            touchLastSaved () {
                this.lastSaved = moment.now()
            },

            goToStep (step) {
                this.$router.push({
                    query: {
                        step: step.uuid
                    }
                })
            },

            handleStepAdded (step) {
                this.steps.push(step)
                this.goToStep(step)
            },

            handleStepDeleted (step) {
                let previousStep = this.previousStep

                this.steps = this.steps.filter((s) => {
                    return s.uuid !== step.uuid
                })

                this.goToStep(previousStep || this.firstStep)
            }
        },

        async asyncData ({app, params}) {
            let snippet = await app.$axios.$get(`snippets/${params.id}`)

            return {
                snippet: snippet.data,
                steps: snippet.data.steps.data
            }
        }
    }
</script>