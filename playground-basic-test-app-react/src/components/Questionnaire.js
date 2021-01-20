import React, { Component } from 'react'
import Questionnaire from '../assets/questionnaire.json'

const componentMap = {
    '1': { component: 'radio', options: ['Yes', 'No'] },
    '2.1': { component: 'radio', options: ['Male', 'Female', 'Others'] },
    '2.2': { component: 'date' },
    '2.3': { component: 'textBox' },
    '2.4': { component: 'radio', options: ['Married', 'UnMarried'] },
    '3.1': { component: 'radio', options: ['Yes', 'No'] },
    '3.2': { component: 'radio', options: ['Yes', 'No'] },
}

const questionList = [
    'Do you have allergies?', 'What is your gender?', 'What is your date of birth?', 'What is your country of birth?', 'What is your marital status?', 'Do you smoke?', 'Do you drink alchohol?'
]

class QuestionnaireComp extends Component {

    state = {

    }

    questionComponents = (eleType, options, question) => {
        if (eleType === 'radio') {
            return <div style={{ display: 'flex' }}>
                {options.map(x => <div style={{ paddingRight: 5 }}><input value={x} type='radio' onChange={e => this.setState({ [question]: e.target.value })} name={question} /><label>{x}</label></div>)}
            </div>
        } else if (eleType === 'date') {
            return <div>
                <input type='date' style={{ width: 150 }} value={this.state[question] || ''} onChange={e => this.setState({ [question]: e.target.value })} />
            </div>
        } else {
            return <div>
                <input type='text' style={{ maxWidth: 150 }} value={this.state[question] || ''} onChange={e => this.setState({ [question]: e.target.value })} />
            </div>
        }

    }

    renderQuestion = (question, type, linkId) => {
        const { component, options } = componentMap[linkId]
        return <div style={{ display: 'flex', margin: 10 }}>
            <div style={{ width: '50%', marginLeft: 5, flexWrap: 'wrap', fontWeight: 400 }}>{`${linkId}. ${question}`}</div>
            <div style={{ width: '50%' }}>{this.questionComponents(component, options, question)}</div>
        </div>
    }

    submitForm = () => {
        const unAnsweredQues = questionList.filter(x => !this.state[x])
        if (unAnsweredQues.length) {
            alert(`The following questions are unanswered\n
            ${unAnsweredQues.join('\n')}`)
            this.setState({ error: 'Error' })
            return
        }
        this.setState({ error: '' })
        Questionnaire.item.forEach(question => {
            if (!question.item) {
                return question.answer = this.state[question.text] === 'Yes' ? true : this.state[question.text] === 'No' ? false : this.state[question.text]
            }
            question.item.forEach(groupQues => {
                groupQues.answer = this.state[groupQues.text] === 'Yes' ? true : this.state[groupQues.text] === 'No' ? false : this.state[groupQues.text]
            })
        })
        const responseObj = {
            "resourceType": "QuestionnaireResponse",
            // from Resource: id, meta, implicitRules, and language
            // from DomainResource: text, contained, extension, and modifierExtension
            "identifier": new Date().toISOString(), // Unique id for this set of answers
            "basedOn": 'Doctor Request', // Request fulfilled by this QuestionnaireResponse
            "partOf": 'Questionnaire', // Part of this action
            "questionnaire": 'Patient Questionnaire', // Form being answered
            "status": "Completed", // R!  in-progress | completed | amended | entered-in-error | stopped
            "subject": 'Patient Details', // The subject of the questions
            "encounter": 'Puja', // Encounter created as part of
            "authored": new Date().toLocaleDateString(), // Date the answers were gathered
            "author": 'Puja',
            "source": 'Patient', // The person who answered the questions
            item: Questionnaire
        }
        alert('Open the console to see the questionnaire Response Object')
        console.log(responseObj)
    }

    render() {
        const { item, subjectType } = Questionnaire
        return (
            <div style={{ padding: 10, width: window.innerWidth, background: '#efefef', margin: 'auto' }}>
                {this.state.error && <div>{this.state.error}</div>}
                <label style={{ fontWeight: 600, margin: 5 }}>{`${subjectType} Questionnaire`}</label>
                {item.map(element => {
                    if (!element.item) {
                        return <div>
                            {this.renderQuestion(element.text, element.type, element.linkId)}
                        </div>
                    }
                    return <div>
                        <label style={{ fontWeight: 600, margin: 5 }}>{element.text}</label>
                        {element.item.map(groupEle => this.renderQuestion(groupEle.text, groupEle.type, groupEle.linkId))}
                    </div>
                })
                }
                <div style={{
                    display: 'flex',
                    marginTop: 20,
                    marginRight: 30,
                    justifyContent: 'center'
                }}>
                    <button style={{
                        border: 'none',
                        padding: 7,
                        borderRadius: 5,
                        marginRight: 20,
                        background: 'deepskyblue',
                        fontWeight: 600,
                        color: 'white'
                    }} onClick={this.submitForm} >Submit</button>
                </div>
            </div>
        )
    }
}

export default QuestionnaireComp

