import { getChatGPTSuggestions } from '@/public/chatgpt.mjs';

<template>
  <div class="text-labeling">
    <div class="text-display">
      <h2>Incident Report</h2>
      <div class="highlighted-text" @mouseup="highlightText">
        <p v-html="highlightedText"></p>
      </div>
    </div>
    <div v-if="loadingKeywords" class="loading-indicator">Loading ChatGPT suggestions...</div>
    <div v-if="chatGPTSuggestions.length">
      <h2>ChatGPT Suggestions</h2>
      <ul>
        <li v-for="(suggestion, index) in chatGPTSuggestions" :key="index">{{ suggestion }}</li>
      </ul>
    </div>
    <button class="save-button" @click="saveHighlightedKeywords">Save</button>
    <div class="keyword-list">
      <h2>Keywords</h2>
      <ul>
        <li v-for="(keyword, index) in keywords" :key="index">{{ keyword }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute } from 'vue-router';

export default {
  props: {
    router: {
      type: Object,
    },
  },
  setup(props) {
    const route = useRoute();
    const filePath = ref(route.query.filePath || "");
    const fileContent = ref("");
    const keywords = ref([]);
    const selectedText = ref("");
    const loadingKeywords = ref(false);
    const chatGPTSuggestions = ref([]);

    // 当组件加载时，请求文件内容
    onMounted(async () => {
        const response = await fetch(`http://localhost:9999/upload/getFileContent?filePath=${filePath.value}`);
        const data = await response.json();
        fileContent.value = data.fileContent;

        //Seek suggestions from chatgpt
        loadingKeywords.value = true;
        try {
            const suggestions = await getChatGPTSuggestions(fileContent.value);
            chatGPTSuggestions.value = suggestions.split(','); // 假设ChatGPT返回一个逗号分隔的关键词列表
        } catch (error) {
            console.error("Error fetching ChatGPT suggestions:", error);
        } finally {
            loadingKeywords.value = false;
        }
    });

    const highlightedText = computed(() => {
      // 高亮关键词
      let highlighted = fileContent.value; // 使用接收到的文件内容
      keywords.value.forEach((keyword) => {
        const regex = new RegExp(keyword, "g");
        highlighted = highlighted.replace(regex, `<span class="highlight">${keyword}</span>`);
      });
      return highlighted;
    });

    const highlightText = () => {
      // 高亮鼠标选中的文本
      const selection = window.getSelection();
      selectedText.value = selection.toString();
    };

    const saveHighlightedKeywords = () => {
      // 保存鼠标选中的文本为关键词
      if (selectedText.value.trim() !== "") {
        keywords.value.push(selectedText.value);
        selectedText.value = "";
      }
    };

    return {
      fileContent,
      keywords,
      selectedText,
      highlightedText,
      highlightText,
      saveHighlightedKeywords,
      loadingKeywords,
      chatGPTSuggestions
    };
  },
};
</script>

<style scoped>
.text-labeling {
  display: flex;
  justify-content: space-around;
  align-items: center; /* 居中对齐 */
  padding: 20px;
}

.text-display {
  flex: 2;
}

.highlighted-text {
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f7f7f7;
  border-radius: 5px;
  position: relative;
}

button.save-button {
  margin-top: 10px;
  padding: 10px 20px; /* 增大按钮大小 */
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.keyword-list {
  flex: 1;
  padding-left: 20px;
}

.keyword-list ul {
  list-style: none;
  padding: 0;
}

.keyword-list li {
  margin-bottom: 5px;
  font-weight: bold;
}

.highlight {
  background-color: yellow;
}

.text-display p {
  white-space: pre-wrap;
}
</style>
