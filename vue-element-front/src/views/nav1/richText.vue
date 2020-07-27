<template>

    <div>


        <!--工具条-->

        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">

           <el-form :inline="true" >

                <el-form-item>

                    <el-button   @click="handleAdd" name='handleAdd'>保存富文本</el-button>

                </el-form-item>

            </el-form>

        </el-col>

            <div id="div1" class="toolbar" ></div>

             <div id="div2" class="text"  @onchange='change' name="richTab" > </div>

    </div>

</template>

<script type="text/javascript">

import Editor from 'wangeditor'

import { getRichText,postRichText } from '@/api/api';

  export default {

    name: 'richText',

    props: {

        report: Object,

        isView:Boolean

    },

    data(){

        return{

            articles:{
                articleId:'',
                articleContent:'',
                releaseUser:'',
            }

        }

    },

    methods:{
        handleAdd(){

             let para = Object.assign({}, this.articles);

                postRichText(para).then(res=>{
                     let { msg, code } = res.data;
                     console.log(msg,code)
                        })
        },

        getTextData() {

           return this.editor1.txt.html()  

        },

        getEditor() {
    

            getRichText().then((res) => {

                this.articles =JSON.parse(res.data.articles)[0];
                this.editor1.txt.html(this.articles.articleContent)
                console.log( this.articles)

            });
      

            // this.editor1.$textElem.attr('contenteditable', this.isView)

        },

        change(html){

        this.articles.articleContent=html

        }

    },

    mounted(){

        this.editor1 = new Editor('#div1', '#div2');

        this.editor1.customConfig.uploadImgShowBase64 = true;

        this.editor1.customConfig.zIndex = 100;

        this.editor1.customConfig.height = "800px";

        this.editor1.customConfig.onchange = this.change
        this.editor1.create();

        this.getEditor()

    }

  }  

</script>

<style>

.w-e-text-container{

    height:800px

}

</style>
