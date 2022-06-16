<template>
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold">
            {{ index + 1 }}. {{ model.question }}
        </h3>
        <div class="flex items-center">
            <button
                type="button"
                @click="addQuestion()"
                class="mx-3"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            </button>
            <button
                type="button"
                @click="deleteQuestion()"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd"/>
                </svg>
            </button>
        </div>


    </div>
    <div class="grid gap-3 grid-cols-12">
        <div class="mt-3 col-span-9">
            <label :for="'question_text_'+model.data">Text</label>
            <input
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                type="text" :name="'question_text_'+model.data" v-model="model.question" @change="dataChange"
                :id="'question_text_'+model.data">
        </div>
        <div class="mt-3 col-span-3">
            <label for="question_type" class="block text-sm font-medium text-gray-700">
                Select Type
            </label>
            <select
                id="question_type"
                name="question_type"
                v-model="model.type"
                @change="typeChange"
                class="mt-1 h-9 block w-full py-2 px-2 border border-gray-300 bg-white roundend-md shadow-sm sm:text-sm"
            >
                <option v-for="type in questionTypes"
                        :key="type"
                        :value="type">
                    {{ type }}
                </option>
            </select>
        </div>
    </div>

    <div class="mt-3 col-span-9">
        <label
            :for="'question_description_'+model.id"
            class="block text-sm font-medium text-gray-800">
            Description
        </label>
        <textarea
            :name="'question_description_'+model.id"
            v-model="model.description"
            @change="dataChange"
            :id="'question_description_'+model.id"
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-1 w-full shadow-sm sm:text-sm"
        >

        </textarea>
    </div>
    <!--    div-->
    <div v-if="shouldHaveOptions()" class="mt-2">
        <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
            Options
            <button type="button" @click="addOption()"
                    class="text-xs py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                Add Options
            </button>
        </h4>
        <div
            v-if="!model.data.options.length"
            class="text-xs text-gray-700 text-center py-3">
            No options
        </div>
        <div
            v-for="(option, index) in questionData.data.options" :key="option.uuid" class="flex items-center mb-1">
            <span class="w-6 text-sm">{{ index + 1 }}. </span>
            <input
                type="text"
                v-model="option.text"
                @change="dataChange"
                class="w-full rounded-sm py-1 px-1 text-sm border border-gray-400 focus:border-b-emerald-700"
            >
            <button
                type="button"
                @click="removeOption(option)"
                class="
            h-6
            w-6
            rounded-full
            flex
            items-center
            justify-center
            border border-transparent
            transition-colors
            hover:border-red-100
          "
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3 text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>
        </div>
    </div>
    <hr class="my-4">
</template>

<script setup>
import {ref, computed} from 'vue';
import store from "../../store";
import {v4 as uuidv4} from "uuid";

const emit = defineEmits(["change", "addQuestion", "deleteQuestion"]);

function shouldHaveOptions() {
    return ['select', 'radio', 'checkbox'].includes(model.value.type);
}

function getOptions() {
    return questionData.value.data.options;
}

function setOptions(options) {
    model.value.data.options = options;
}


function addOption() {
    questionData.value.data.options = [...questionData.value.data.options, { uuid: uuidv4(), text: "" }];
    dataChange();
}

function removeOption(op) {
    questionData.value.data.options = questionData.value.data.options.filter((opt) => opt !== op);
    dataChange();
}

function typeChange() {
    if (shouldHaveOptions()) {
        setOptions(getOptions() || []);
    }
    dataChange();
}

function dataChange() {
    const data = JSON.parse(JSON.stringify(model.value));
    if (!shouldHaveOptions()) {
        delete data.data.options;
    }
    emit("change", data)
}

const props = defineProps({
    question: Object,
    index: Number
})

function deleteQuestion(){
    emit("deleteQuestion", props.index+1)
}

function addQuestion(){
    emit("addQuestion", props.question)
}

const model = ref(JSON.parse(JSON.stringify(props.question)));

const questionData = ref(JSON.parse(JSON.stringify(props.question)));


const questionTypes = computed(() => store.state.questionTypes);
</script>

<style scoped>

</style>
