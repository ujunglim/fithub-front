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

export interface ChatRoomResponseDto { 
    /**
     * 채팅방 id
     */
    roomId?: number;
    /**
     * 채팅상대 이름
     */
    name?: string;
    /**
     * 채팅방 수정일
     */
    modifiedDate?: Date;
}