
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import InputTypeSubmit from './simple.components/InputTypeSubmit'
import Button from './simple.components/Button'


const Skill = props => (
  <tr>
    <td className="align-middle">{props.skill.skill}</td>
    <td className="align-middle">{props.skill.proficiency}</td>
    <td className="align-middle">{props.skill.example}</td>
    <td className="text-right">
      <Link to={"skill/edit/" + props.skill._id}>
        <InputTypeSubmit label="✏️" type="edit" />
      </Link>
      <a href="#" onClick={() => { props.deleteSkill(props.skill._id) }}>
        <InputTypeSubmit label="🗑" type="delete" />
      </a>
    </td>
  </tr>
)


export default class SkillsList extends Component {
  constructor(props) {
    super(props);

    this.deleteSkill = this.deleteSkill.bind(this)

    this.state = { skills: [] };
  }

  componentDidMount() {
    axios.get('https://personal-tracker-mrt.herokuapp.com/skill')
      .then(response => {
        this.setState({ skills: response.data })
      },
        console.log(this.state.skills))
      .catch((error) => {
        console.log(error);
      })
  }

  deleteSkill(id) {
    axios.delete('https://personal-tracker-mrt.herokuapp.com/skill/id/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      skills: this.state.skills.filter(el => el._id !== id)
    })
  }

  skillList() {
    return this.state.skills.map(currentskill => {
      return <Skill skill={currentskill} deleteSkill={this.deleteSkill} key={currentskill._id} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Skills</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Skill</th>
              <th>Proficiency</th>
              <th>Example</th>
              <th className="text-right pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.skillList()}
          </tbody>
        </table>

        <Link to={"/skill/create"}>
          <Button label="New Skill"></Button>
        </Link>


      </div>
    )
  }
}