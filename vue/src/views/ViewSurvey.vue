<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex items-center justify-between sticky">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ surveyData.id ? surveyData.title : 'Create New Survey' }}
                </h1>
            </div>
        </template>

        <div>
            <div class="md:grid md:grid-cols-3 md:gap-6">
                <div class="md:col-span-1">
                    <div class="px-4 sm:px-0">
                        <h3 class="text-lg font-medium leading-6 text-gray-900">
                            {{ surveyData.id ? surveyData.title : 'New Survey' }}</h3>
                        <p class="mt-1 text-sm text-gray-600">
                            {{ surveyData.id ? 'Edit Survey' : 'This information will be displayed publicly' }}.</p>
                    </div>
                </div>
                <div class="mt-5 md:mt-0 md:col-span-2">
                    <form @submit.prevent="storeSurvey">
                        <div class="shadow sm:rounded-md sm:overflow-hidden">
                            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                                <div>
                                    <label for="about" class="block text-sm font-medium text-gray-700"> Title </label>
                                    <div class="mt-1">
                                        <input v-model="surveyData.title"
                                               id="title" name="title"
                                               class="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md h-8"
                                               placeholder="Survey Title"/>
                                    </div>
                                </div>
                                <div>
                                    <label for="about" class="block text-sm font-medium text-gray-700"> Expire
                                        date </label>
                                    <div class="mt-1">
                                        <input v-model="surveyData.expire_date" id="expire_date" name="expire_date"
                                               type="date"
                                               class="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md h-8"
                                               placeholder="Expire date"/>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700"> Photo </label>
                                    <div class="mt-1 flex items-center">

                                        <span class="inline-block w-25 rounded-md overflow-hidden bg-gray-100">
                                        <img v-if="surveyData.image"
                                             :src="surveyData.image"
                                             :alt="surveyData.title">
                                          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                               viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                              <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                            </svg>
                                        </span>
                                        <input type="file" class="mx-3"/>

                                    </div>
                                </div>
                                <div>
                                    <label for="about" class="block text-sm font-medium text-gray-700"> About </label>
                                    <div class="mt-1">
                                        <textarea v-model="surveyData.description" id="about" name="about" rows="3"
                                                  class="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                  placeholder="Brief description for your survey."/>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input type="checkbox" name="status" id="status" v-model="surveyData.status">
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="status" class="font-medium text-gray-700">
                                            Active
                                        </label>
                                    </div>
                                </div>
                                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                                    <h3 class="text-2xl flex items-center justify-between">Questions
                                    <button type="button" class="text-sm bg-gray-700 text-white px-3 py-2 rounded-md hover:bg-gray-800" @click="addQuestion()">
                                        + Add Question
                                    </button>
                                    </h3>
                                    <div v-if="!surveyData.questions.length" class="text-center text-gray-600">
                                        No data
                                    </div>
                                    <div v-else v-for="(question, index) in surveyData.questions" :key="question.id">
                                        <QuestionEdit
                                        :question="question"
                                        :index="index"
                                        @addQuestion="addQuestion"
                                        @deleteQuestion="deleteQuestion"
                                        >

                                        </QuestionEdit>
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
import QuestionEdit from "../components/edit/QuestionEdit.vue";
import {ref, computed} from "vue";
import {useRoute} from "vue-router";
import store from "../store";
import {v4 as uuidv4} from "uuid";
const model = []
const route = useRoute();

const survey = computed(() =>
    store.state.surveys.find((s) => s.id === parseInt(route.params.id))
);

const surveyData = ref({
    ...survey.value,
    status: survey.value.status !== 'draft'
});

function addQuestion(index) {
    const newQuestion = {
        id: uuidv4(),
        type: "text",
        question: "",
        description: null,
        data: {},
    };
    surveyData.value.questions.splice(index, 0, newQuestion);
}
function deleteQuestion(question) {
    surveyData.value.questions = surveyData.value.questions.filter((q) => q !== question);
}

if (route.params.id) {
    model.value = store.state.surveys.find(
        (s) => s.id === parseInt(route.params.id)
    );
}
</script>

<style scoped>

</style>
