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

export interface TrainingDateReservationNumDto { 
    id?: number;
    date?: string;
    /**
     * 해당 날에 잡혀있는 진행 전 예약
     */
    reservationNum?: number;
}