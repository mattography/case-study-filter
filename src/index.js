import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import portfolio from './utils/projects'
import { faColumns, faGripLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {createUseStyles} from 'react-jss'
import './index.css';

const useStyles = createUseStyles({
  root: {
    maxWidth: 800,
    margin: '0 auto'
  },
  pageHeader: {
    fontFamily: 'ToledoTS',
    fontSize: 30,
    color: '#283455',
    textAlign: 'center'
  },
  portfolioLabels: {
    justifyContent: 'center',
    flexFlow: 'wrap',
    fontFamily: 'Arial',
    display: 'flex',
    padding: 20,
    '& a':{
      textTransform: 'uppercase',
      padding: '0 10px',
      color: '#000000',
      textDecoration: 'none',
      '&:focus':{
        color: '#000',
        backgroundColor: '#ccc',
        padding: '0px 10px',
        borderRadius: 4
      }
    }
  },
  switch: {
    cursor: 'pointer',
    width: '40px!important',
    border: '1px solid #ddd',
    padding: 5
  },
  portfolioContainerRow: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '100%',
    margin: '20px auto',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  portfolioContainerColumn:{
    flexDirection: 'column',
    display: 'flex',
    maxWidth: 800,
    margin: '20px auto',
    justifyContent: 'center'
  },
  toggleSwitch: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 10,
    maxWidth: 800,
    margin: '0 auto'
  },
  toggleButton: {
    border: '1px solid #333',
    backgroundColor: 'transparent',
    borderRadius: 3,
    padding: 10,
    width: 'auto'
  },
  activeSwitch: {
    backgroundColor: '#ddd'
  },
  tag: {
    border: '1px solid #000',
    borderRadius: 2,
    padding: 5,
    marginRight: 5,
    fontSize: 10,
    cursor: 'pointer'
  },
  cardColumn: {
    height: 350,
    width: 300,
    border: '2px solid #F2F5F8',
    margin: '0 10px 10px',
    textAlign: 'center',
    padding: '20px 0',
    borderRadius: 5,
    backgroundColor: '#fff',
    '& h3':{
      fontFamily: 'ToledoTS'
    },
    '&:hover':{
      borderRadius: 5,
      boxShadow: '0px 0px 5px 0px #333',
      transition: 'margin-right',
      transitionDuration: '1s'
    }
  },
  cardRow: {
    minWidth: '200px',
    height: 150,
    border: '2px solid #F2F5F8',
    margin: '0 10px 10px',
    padding: 10,
    textAlign: 'left',
    borderRadius: 5,
    '& h3':{
      fontFamily: 'ToledoTS'
    },
    '&:hover':{
      boxShadow: '0px 0px 2px 0px #333',
      transition: 'margin-right',
      transitionDuration: '1s'
    }
  }
})


const FilterGrid = () => {
  const classes = useStyles()
  const [filter, setFilter] = useState("all");
  const [projects, setProjects] = useState([]);
  const [direction, setDirection] = useState(false)

  let categories = []
  for(let i = 0; i < projects.length; i++){
    projects[i].category.map(cat => categories.push(cat))
  }
  const uniqueCategories = [...new Set(categories)]
  

  useEffect(() => {
    setProjects(portfolio.projects);
  }, [])

  useEffect(() => {
    setProjects([]);

    const filtered = portfolio.projects.map(p => ({
      ...p,
      filtered: p.category.includes(filter)
    }));
    setProjects(filtered);
  },[filter]);

  const handleDirection = () => {
    setDirection(!direction)
  }
  return (
    <div className={classes.root}>
      <div className={classes.pageWrapper}>
      <h2 className={classes.pageHeader}>Case Studies</h2>
      <div className={classes.portfolioLabels}>
      {uniqueCategories.map((item, i) =>
        <a href="/#" key={i} active={filter === `${item}`} onClick={() => setFilter(`${item}`)}>
          {item}
        </a>
      )}
      </div>
      <div className={classes.toggleSwitch}>
          <FontAwesomeIcon title="Switch to rows" onClick={() => handleDirection(direction)} icon={faGripLines} className={classnames(classes.switch, !direction ? classes.activeSwitch : null)}/> 
          <FontAwesomeIcon title="Switch to columns" onClick={() => handleDirection(!direction)} icon={faColumns} className={classnames(classes.switch, direction ? classes.activeSwitch : null)}/>
      </div>
      <div className={classnames(direction ? classes.portfolioContainerRow : classes.portfolioContainerColumn)}>
        {projects.map(item =>
          item.filtered === true && 
          <div className={classnames(direction ? classes.cardColumn : classes.cardRow)} key={item.name}>
            <h3>{item.name}</h3>
            {item.category.map((tag,i) => <span className={classes.tag} key={i} active={filter === `${tag}`} onClick={() => setFilter(`${tag}`)}>{tag.toUpperCase()}</span>)}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <FilterGrid />
  </React.StrictMode>,
  document.getElementById('root')
);
