<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ model.id ? model.title : 'Create New Survey' }}
                </h1>
            </div>
        </template>

        <div>
            <div class="md:grid md:grid-cols-3 md:gap-6">
                <div class="md:col-span-1">
                    <div class="px-4 sm:px-0">
                        <h3 class="text-lg font-medium leading-6 text-gray-900">
                            {{ model.id ? model.title : 'New Survey' }}</h3>
                        <p class="mt-1 text-sm text-gray-600">
                            {{ model.id ? 'Edit Survey' : 'This information will be displayed publicly' }}.</p>
                    </div>
                </div>
                <div class="mt-5 md:mt-0 md:col-span-2">
                    <form @submit.prevent="storeSurvey">
                        <div class="shadow sm:rounded-md sm:overflow-hidden">
                            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                                <div>
                                    <label for="about" class="block text-sm font-medium text-gray-700"> Title </label>
                                    <div class="mt-1">
                                        <p v-if="model.title">{{ model.title }}</p>
                                        <input v-else id="title" name="title"
                                                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md h-8"
                                                  placeholder="Survey Title"/>
                                    </div>
                                </div>
                                <div>
                                    <label for="about" class="block text-sm font-medium text-gray-700"> Expire date </label>
                                    <div class="mt-1">
                                        <p v-if="model.expire_date">{{ model.expire_date }}</p>
                                        <input v-else id="expire_date" name="expire_date" type="date"
                                                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md h-8"
                                                  placeholder="Expire date"/>
                                    </div>
                                </div>
                                <div>
                                    <label for="image" class="block text-sm font-medium text-gray-700"> Image </label>
                                    <div class="mt-1">
                                        <img v-if="model.image" :src="model.image" :alt="model.title">
                                        <input v-else id="image" name="image"
                                                type="file"
                                                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                  placeholder="Brief description for your survey."/>
                                    </div>
                                </div>

                                <div>
                                    <label for="about" class="block text-sm font-medium text-gray-700"> About </label>
                                    <div class="mt-1">
                                        <p v-if="model.description">{{ model.description }}</p>
                                        <textarea v-else id="about" name="about" rows="3"
                                                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                        placeholder="Brief description for your survey."/>
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit"
                                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue";
import {ref} from "vue";
import {useRoute} from "vue-router";
import store from "../store";

const route = useRoute();

const model = ref({
    id: null,
    title: '',
    status: false,
    description: null,
    image: null,
    expire_date: null,
    questions: []
})

console.log(route.params)

if (route.params.id) {
    model.value = store.state.surveys.find(
        (s) => s.id === parseInt(route.params.id)
    );
}
</script>

<style scoped>

</style>
