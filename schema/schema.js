const graphql = require('graphql');
const _ = require('lodash');
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const PatientType = new GraphQLObjectType({
    name: 'Patient',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        symptoms: { type: GraphQLString },
        doctor: {
            type: DoctorType,
            resolve(parent, args) {
                return Doctor.findById(parent.doctorId);
            }
        }
    })
})

const DoctorType = new GraphQLObjectType({
    name: 'Doctor',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        patients: {
            type: new GraphQLList(PatientType),
            resolve(parent, args) {
                return Patient.find({ doctorId: parent.id })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        patient: {
            type: PatientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Patient.findById(args.id)
            }
        },
        doctor: {
            type: DoctorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Doctor.findById(args.id);
            }
        },
        patients: {
            type: new GraphQLList(PatientType),
            resolve(parent, args) {
                return Patient.find()
            }
        },
        doctors: {
            type: new GraphQLList(DoctorType),
            resolve(parent, args) {
                return Doctor.find()
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDoctor: {
            type: DoctorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let doctor = new Doctor({
                    name: args.name,
                    age: args.age
                });
                return doctor.save();
            }
        },
        addPatient: {
            type: PatientType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                symptoms: { type: new GraphQLNonNull(GraphQLString) },
                doctorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let patient = new Patient({
                    name: args.name,
                    symptoms: args.symptoms,
                    doctorId: args.doctorId,
                })
                return patient.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})