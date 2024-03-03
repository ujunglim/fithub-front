/**
 * Fithub API Document
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface ProfileDto { 
    name?: string;
    nickname?: string;
    email?: string;
    phone?: string;
    gender?: ProfileDto.GenderEnum;
    bio?: string;
    profileImg?: string;
    grade?: ProfileDto.GradeEnum;
    trainer?: boolean;
}
export namespace ProfileDto {
    export type GenderEnum = 'F' | 'M' | 'UNDEFINED';
    export const GenderEnum = {
        F: 'F' as GenderEnum,
        M: 'M' as GenderEnum,
        UNDEFINED: 'UNDEFINED' as GenderEnum
    };
    export type GradeEnum = 'INTRODUCTORY' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    export const GradeEnum = {
        INTRODUCTORY: 'INTRODUCTORY' as GradeEnum,
        BEGINNER: 'BEGINNER' as GradeEnum,
        INTERMEDIATE: 'INTERMEDIATE' as GradeEnum,
        ADVANCED: 'ADVANCED' as GradeEnum
    };
}