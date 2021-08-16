import Head from 'next/head'
import axios from 'axios'
import {Row, Col, Breadcrumb, Affix} from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../styles/pages/detailed.css'
import {CalendarOutlined, FileDoneOutlined, FireOutlined} from '@ant-design/icons'
import ReactMarkdown from 'react-markdown'
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'

import servicePath from '../config/apiUrl'

export default function Detailed(props) {

  const tocify = new Tocify()
  const renderer = new marked.Renderer()

  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>`
  }

  marked.setOptions({
    renderer: renderer,
    gfm: true,  // 类似github上面的markdown的渲染方式
    pedantic: false,  // 容错机制 false表示允许完全不是markdown的格式也可以进行渲染
    sanitize: false,   // 是否忽略我的html标签
    tables: true,   // 渲染成github上面的表格形式 必须和gfm同时开启 不然就会失效
    breaks: false,   // 是否启用github的换行符 也要和gfm使用
    smartLists: true,  // 自动渲染列表的样式
    highlight: function(code) { // 如何让代码高亮
      return hljs.highlightAuto(code).value
    }
  })

  let html = marked(props.article_content)

  return (
    <div>
      <Head>
        <title>Detailed</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                <Breadcrumb.Item>xxx</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">
                React实战视频教程-技术胖blog开发
              </div>
              <div className="list-icon center">
                <span><CalendarOutlined /> 2021-01-10</span>
                <span><FileDoneOutlined /> 视频教程</span>
                <span><FireOutlined /> 5864人在看</span>  
              </div>
              <div className="detailed-content" dangerouslySetInnerHTML={{__html: html}}>
                {/* <ReactMarkdown 
                  source={markdown}
                  escapeHtml={false}
                /> */}
              </div>
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              {/* <MarkNav 
                className="article-menu"
                source={html}
                ordered={false}
              /> */}
              {tocify && tocify.render()}
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </div>      
  )
}

Detailed.getInitialProps = async (context) => {
  console.log(context.query.id)

  let id = context.query.id

  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleById + id).then((res) => {
      console.log(res.data)
      resolve(res.data.data[0])
    })
  })

  return await promise
}
