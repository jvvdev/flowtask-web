class MemberService {
    async ModifyMember(data: any) {
        console.log(data)
    }

    async DeleteMember(memberId: number) {
        // Logic to delete a member
    }
}

export const memberService = new MemberService();