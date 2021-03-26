import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import portfolio from './utils/projects'
import { faColumns, faGripLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {createUseStyles} from 'react-jss'
import './index.css';

const useStyles = createUseStyles({
  portfolioLabels: {
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: '#fff',
    boxShadow: '1px 2px 2px 2px #eee',
    padding: 20,
    '& a':{
      textTransform: 'uppercase',
      padding: '0 10px 0 0',
      color: '#000000',
      textDecoration: 'none'
    }
  },
  switch: {
    cursor: 'pointer'
  },
  portfolioContainerRow: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '80%',
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
    backgroundColor: '#fff',
    border: '1px solid #333',
    margin: '0 10px 10px 0',
    textAlign: 'center',
    padding: '20px 0',
    borderRadius: 5,
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
    backgroundColor: '#eee',
    border: '1px solid #333',
    margin: '0 10px 10px 0',
    boxShadow: '0px 0px 2px 0px #000',
    padding: 10,
    textAlign: 'left',
    borderRadius: 5,
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
    <>
      <div className={classes.portfolioLabels}>
      {uniqueCategories.map((item, i) =>
        <a href="/#" key={i} active={filter === `${item}`} onClick={() => setFilter(`${item}`)}>
          {item}
        </a>
      )}
      </div>
      <div className={classes.toggleSwitch}>
      {direction ? <FontAwesomeIcon title="Switch to rows" onClick={() => handleDirection(direction)} icon={faGripLines} className={classes.switch}/> : <FontAwesomeIcon title="Switch to columns" onClick={() => handleDirection(!direction)} icon={faColumns} className={classes.switch}/>}
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
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <FilterGrid />
  </React.StrictMode>,
  document.getElementById('root')
);
