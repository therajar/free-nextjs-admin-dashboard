export default function Page({ params }: { params: { address: string } }) {
    return <div>My Post: {params.address}</div>
}