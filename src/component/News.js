import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner"
import InfiniteScroll from 'react-infinite-scroll-component';
import businessData from "./newsData/businessNewsData.json";
import entertainmentData from "./newsData/entertainmentNewsData.json";
import generalData from "./newsData/generalNewsData.json";
import scienceData from "./newsData/scienceNewsData.json";
import healthData from "./newsData/healthNewsData.json";
import technologyData from "./newsData/technologyNewsData.json";
import sportsData from "./newsData/sportsNewsData.json";

export default class News extends Component{
    articles =[]
    count = 0;
    constructor(props)
    {
        super(props);
        this.state={
            articles: this.articles,
            loading: true,
            page: 1,
            author: this.author,
            date: this.date,
            source: this.source,
            totalResults: 0,
            currentJsonFile: this.currentJsonFile
        };
        const titles = (this.props.category).charAt(0).toUpperCase() + (this.props.category).slice(1);
        document.title = titles;

        const onPageLoad=(data)=>{
            this.props.sendData(data);
            
        }

        onPageLoad(this.props.category);
        
    }

    // async updateNews ()
    //     {
    //       console.log(businessData);
    //       let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //       this.setState({loading:true});
    //       let data = await fetch(url);
    //       let parseData = await data.json();
    //       await this.setState({articles : parseData.articles, page: this.state.page, loading:false, author:parseData.author,date:parseData.date, totalResults:parseData.totalResults});
    //     }

         async updateNews ()
        {
            let parseData = generalData.articles;
            let totalLength = 0;
            let currentJson = generalData;
            
          this.setState({loading:true});
          switch(this.props.category){
            case "sports":
                parseData = sportsData.articles.slice(0,10);
                currentJson = sportsData;
                totalLength = sportsData.articles.length;
                
                break;
            case "business":
                parseData = businessData.articles.slice(0,10);
                currentJson = businessData;
                totalLength = businessData.articles.length;
                break;
            case "entertainment":
                parseData = entertainmentData.articles.slice(0,10);
                currentJson = entertainmentData;
                totalLength = entertainmentData.articles.length;
                break;
            case "general":
                parseData = generalData.articles.slice(0,10);
                currentJson = generalData;
                totalLength = generalData.articles.length;
                break;
            case "health":
                parseData = healthData.articles.slice(0,10);
                currentJson = healthData;
                totalLength = sportsData.articles.length;
                break;
            case "science":
                parseData = scienceData.articles.slice(0,10);
                currentJson = scienceData;
                totalLength = scienceData.articles.length;
                break;
            case "technology":
                parseData = technologyData.articles.slice(0,10);
                currentJson = technologyData;
                totalLength = technologyData.articles.length;
                break;
            default:
          }
          console.log(parseData);
          await this.setState({articles : parseData, page: this.state.page, loading:false, author:parseData.author,date:parseData.date, totalResults:totalLength,currentJsonFile:currentJson});
          
        }

    async componentDidMount(){
        this.updateNews();
    }

    // fetchMoreData= async()=>{
        
    //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //     this.setState({page:this.state.page + 1});
    //       this.setState({loading:false});
    //       let data = await fetch(url);
    //       let parseData = await data.json();
    //       await this.setState({articles : this.state.articles.concat(parseData.articles), page: this.state.page, loading:false, author:parseData.author,date:parseData.date, totalResults:parseData.totalResults});
    //       console.log(this.state.page + " "+this.state.articles.length);
    // }

        fetchMoreData= async()=>{

            let pages = this.state.page*10;
            let condition = this.state.totalResults-pages;
            let parseData = this.state.currentJsonFile.articles.slice(pages,condition>10?pages+10:pages+condition);
            console.log(this.state.page);
            this.setState({loading:false});
          
          await this.setState({articles : this.state.articles.concat(parseData), page: this.state.page+1, loading:false, author:parseData.author,date:parseData.date});
          console.log(this.state.page + " "+this.state.articles.length);
    }

    // handlePreviousClick = async ()=>{
    //     this.setState({page:this.state.page - 1});
    //     this.updateNews();
    // }

    // handleNextClick = async ()=>{
    //     this.setState({page:this.state.page + 1});
    //     this.updateNews();
    // }

    render(){
        return(
           <>
            <div>
                        {/* <h1 className="text-center py-3">Top {this.props.category} News</h1> */}
                        
                        {this.state.loading && <Spinner/>}
                        <InfiniteScroll
                        dataLength={this.state.articles.length} //This is important field to render the next data
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults }>
                        <div className="container" style={{paddingTop:"250px"}}>
                        {<div className="row">
                            {this.state.articles.map((element)=>{ 
                                return (<div className="col-md-3" style={{paddingTop:"15px"}} key={element.url}>
                                    
                                <NewsItem title={element.title!=null?element.title.slice(0,60):" "} discription={element.description?element.description.slice(0,60):" "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                                </div>);   
                            })}
                        </div>}
                        </div>
                        </InfiniteScroll>

                        {/* <div className="d-flex justify-content-between my-3">
                          <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePreviousClick}>&#8592; Previous</button>
                          <h4>{this.state.page}</h4>
                          <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResultss/this.props.pageSize)} className="btn btn-dark mx-3" onClick={this.handleNextClick}> Next &#8594;</button>
                        </div> */}
                   
             </div>
            </>
        );
    }
}
